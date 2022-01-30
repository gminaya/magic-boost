import { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { insertNewLocation } from 'db/Locations';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { uploadImageToSupabase } from 'db/hooks/useUploadPhoto';
import 'styles/components/newLocationForm.scss';

type RequiredMark = boolean | 'optional';

const { Option } = Select;

type LocationFormat = 'billboard' | 'mini-billboard' | 'digital';
type LocationOrientation = 'car-flow' | 'walker-flow' | 'NA';

function NewLocationForm() {
  const [form] = Form.useForm();
  //TODO: Gabriel: Why is this needed?
  const [requiredMark] = useState<RequiredMark>('optional');
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [format, setFormat] = useState<LocationFormat>('billboard');
  const [orientation, setOrientation] = useState<LocationOrientation>('NA');

  let selectedFile: File;

  const success = () => {
    message.success('Your new location has saved 😁');
  };
  const error = () => {
    message.error('oh no! something went wrong 😩');
  };
  const hanldeOrientationChange = (value: string | undefined) => {

    switch (value) {
    case 'car-low':
      setOrientation('car-flow');
      break;

    case 'walker-flow':
      setOrientation('walker-flow');
      break;

    case 'NA':
      setOrientation('NA');
      break;
    }
  };

  const handleFormatChange = (value: string | undefined) => {

    switch (value) {
    case 'billboard':
      setFormat('billboard');
      break;

    case 'mini-billboard':
      setFormat('mini-billboard');
      break;

    case 'digital':
      setFormat('digital');
      break;
    }
  };

  //Saves new location in DB
  const onSummit = async () => {
    
    const defaultPictureUrl =  await uploadImageToSupabase(selectedFile, 'default-pictures');
    
    if(defaultPictureUrl === undefined){
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
        initialValues={{ requiredMarkValue: requiredMark }}
        requiredMark={requiredMark}>
        <Form.Item
          requiredMark={true}
          label="Location Name"
          name="name"
          tooltip="The name most be a location fisical adress reference"
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
            onChange={value => { handleFormatChange(value?.toString()); }}
          >
            <Option value="billboard">Billboard</Option>
            <Option value="mini-billboard">Mini Billboard</Option>
            <Option value="digital">Digital</Option>
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
            onChange={value => { hanldeOrientationChange(value?.toString()); }}
          >
            <Option value="car-flow">Car flow</Option>
            <Option value="walker-flow">Walker flow</Option>
            <Option value="NA">NA</Option>
          </Select>
        </Form.Item>
        <Form.Item
          requiredMark={true}
          label="Location picture" required
          tooltip="This picture will be used for pre sales reports"
          name="picture"
          rules={[{ required: true, message: 'This can not be empty 🤦' }]}>
          <Input
            onChange={(e) => {
              if (e.target.files) {
                selectedFile = e.target.files[0];
              }
            }
            }
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