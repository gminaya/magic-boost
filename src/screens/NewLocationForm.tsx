import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { insertNewLocation } from '../db/Locations';

type RequiredMark = boolean | 'optional';

function NewLocationForm() {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const success = () => {
        message.success('Your new location have been saved :D');
    };
    const error = () => {
        message.error('oh no! something went wrong');
    };
    const handleSaveSummit = async () => {
        const response = await insertNewLocation(name, adress, latitude, longitude);
        if (response) {
            success()
        }
        else {
            error()
        }
    }

    return (
        <Form
            form={form}
            onFinish={handleSaveSummit}
            layout={'vertical'}
            initialValues={{ requiredMarkValue: requiredMark }}
            requiredMark={requiredMark}>
            <Form.Item
                requiredMark={true}
                label="Location Name" required
                tooltip="The name most be a location fisical adress reference">
                <Input placeholder="Type location name"
                    onChange={e => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
                requiredMark={true}
                label="Location Adress" required
                tooltip="Use an accurate address">
                <Input placeholder="Type location fisical adress"
                    onChange={e => setAdress(e.target.value)} />
            </Form.Item>

            <Form.Item
                requiredMark={true}
                label="Location Latitude" required
                tooltip="Use grades and minutes dedimals formart (DMM)">
                <Input name="locationLatitude"
                    placeholder="Type location latitude ex. 41 24.2028"
                    onChange={e => setLatitude(Number(e.target.value))} />
            </Form.Item>

            <Form.Item
                requiredMark={true}
                label="Location longitude" required
                tooltip="Use grades and minutes dedimals formart (DMM)">

                <Input name="locationLongitude"
                    placeholder="Type location longitude ex. 2 10.4418"
                    onChange={e => setLongitude(Number(e.target.value))}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )

}

export default NewLocationForm;