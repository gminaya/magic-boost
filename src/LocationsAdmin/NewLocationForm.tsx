import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { insertNewLocation } from 'db/Locations';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import 'styles/components/newLocationForm.scss';

type RequiredMark = boolean | 'optional';

function NewLocationForm() {
  const [form] = Form.useForm();
  //TODO: Gabriel: Why is this needed?
  const [requiredMark] = useState<RequiredMark>('optional');
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const success = () => {
    message.success('Your new location has saved 😁');
  };
  const error = () => {
    message.error('oh no! something went wrong 😩');
  };

  //Saves new location in DB
  const onSummit = async () => {
    const response = await insertNewLocation(name, adress, latitude, longitude);
    if (response) {
      success();
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