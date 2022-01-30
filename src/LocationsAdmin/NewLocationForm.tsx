import { useCallback, useRef, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { insertNewLocation } from 'db/Locations';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

import { uploadImageToSupabase } from 'db/hooks/useUploadPhoto';
import { LocationFormat, LocationFormatLabels } from 'models/LocationFormat';
import { LocationOrientation, LocationOrientationLabels } from 'models/LocationOrientation';

import 'styles/components/newLocationForm.scss';

const { Option } = Select;

function NewLocationForm() {
  const [form] = Form.useForm();

  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [format, setFormat] = useState<LocationFormat>('billboard');
  const [orientation, setOrientation] = useState<LocationOrientation>('NA');

  const selectedFile = useRef<File>();

  //TODO: Gabi: need to find ways to make this generic
  const success = () => {
    message.success('Your new location has saved 😁');
  };
  const error = () => {
    message.error('oh no! something went wrong 😩');
  };

  const handleOrientationChange = (value: LocationOrientation) => {
    setOrientation(value);
  };

  const handleFormatChange = (value: LocationFormat) => {
    setFormat(value);
  };

  // ReactDOM event handler type is WRONG. Ignoring. 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePictureSelection = useCallback((e: any) => {
    if (e.target.files) {
      selectedFile.current = e.target.files[0];
    }
  }, [selectedFile.current]);


  //Saves new location in DB
  const onSummit = async () => {
    if (!selectedFile.current) {
      throw Error('Attempted to submit empty file');
    }

    const defaultPictureUrl = await uploadImageToSupabase(selectedFile.current, 'default-pictures');

    if (defaultPictureUrl === undefined) {
      return;
    }

    const response = await insertNewLocation(name, adress, latitude, longitude, format, defaultPictureUrl, orientation);
    if (response) {
      success();
      form.resetFields();
    }
    else {
      error();
    }
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity<Location>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='new-location-form-container'>
      <Form
        form={form}
        preserve={false}
        onFinish={onSummit}
        onFinishFailed={onFinishFailed}
        layout={'vertical'}
      >
        <Form.Item
          requiredMark={true}
          label="Location Name"
          name="name"
          tooltip="The name must be a location fisical adress reference"
          rules={[{ required: true, message: 'Name can not be empty 🤨' }]}
        >
          <Input
            placeholder="Type location name"
            onChange={e => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          requiredMark={true}
          label="Location Adress"
          tooltip="Use an accurate address"
          name="adress"
          rules={[{ required: true, message: 'Adress can not be empty 😒' }]}>
          <Input
            placeholder="Type location fisical adress"
            onChange={e => setAdress(e.target.value)} />
        </Form.Item>
        <Form.Item
          requiredMark={true}
          label="Location Latitude"
          tooltip="Use grades and minutes dedimals formart (DMM)"
          name="latitude"
          rules={[{ required: true, message: 'Latitude can not be empty 🤦‍♀️' }]}>
          <Input
            placeholder="Type location latitude ex. 18.4651167"
            onChange={e => setLatitude(Number(e.target.value))}
            type="number" />
        </Form.Item>
        <Form.Item
          requiredMark={true}
          label="Location longitude" required
          tooltip="Use grades and minutes dedimals formart (DMM)"
          name="longitude"
          rules={[{ required: true, message: 'Longitude can not be empty 🤦' }]}>
          <Input
            placeholder="Type location longitude ex. -69.9341466"
            onChange={e => setLongitude(Number(e.target.value))}
            type="number"
          />
        </Form.Item>
        <Form.Item
          requiredMark={true}
          label="Location Format" required
          tooltip="Select the location format acording documentation"
          name="format"
          rules={[{ required: true, message: 'This can not be empty 🤦' }]}>
          <Select
            placeholder="Select the format"
            onChange={handleFormatChange}
          >
            {Object.entries(LocationFormatLabels).map(([locationType, locationLabel]) => (
              <Option key={locationType} value={locationType}>{locationLabel}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          requiredMark={true}
          label="Location Orientation" required
          tooltip="Select the location orientation acording documentation"
          name="orientation"
          rules={[{ required: true, message: 'This can not be empty 🤦' }]}>
          <Select
            placeholder="Select the orientation"
            onChange={handleOrientationChange}
          >
            {Object.entries(LocationOrientationLabels).map(([orientationType, orientationLabel]) => (
              <Option key={orientationType} value={orientationType}>{orientationLabel}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          requiredMark={true}
          label="Location picture" required
          tooltip="This picture will be used for pre sales reports"
          name="picture"
          rules={[{ required: true, message: 'This can not be empty 🤦' }]}>
          <Input
            onChange={handlePictureSelection}
            type="file"
          />
        </Form.Item>
        <Form.Item wrapperCol={{}}>
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
            SAVE LOCATION
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewLocationForm;