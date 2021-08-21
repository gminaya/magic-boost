import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button, Input, message, DatePicker, Row, Col, Table } from 'antd';
import { useLocations } from '../db/hooks/getLocations';



export const NewCampaignForm = () => {

    const { locations, refreshLocations } = useLocations();

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
    type RequiredMark = boolean | 'optional';

    const styles = {
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const success = () => {
        message.success('Your new location has saved 😁');
    };
    const error = () => {
        message.error('oh no! something went wrong 😩');
    };
    const handleSaveSummit = async () => {
        'ds';
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Add',

        }
    ];

    return (
        <>
            <Row>
                <Form
                    form={form}
                    preserve={false}
                    onFinish={handleSaveSummit}
                    onFinishFailed={onFinishFailed}
                    layout={'inline'}
                    initialValues={{ requiredMarkValue: requiredMark }}
                    requiredMark={requiredMark}
                >
                    <Form.Item
                        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                        requiredMark={true}
                        label="Campaign Name"
                        name="name"
                        tooltip="The name have to be as the client named the campaign"
                        rules={[{ required: true, message: 'Name can not be empty 🤨' }]}
                    >
                        <Input placeholder="Type campaign name" />
                    </Form.Item>

                    <Form.Item
                        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                        requiredMark={true}
                        label="Due Date"
                        tooltip="Due Date is the due date for the report to be delivery"
                        name="adress"
                        rules={[{ required: true, message: 'Due date can not be empty 😒' }]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item wrapperCol={{}}>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            <Row>
                <Table
                    style={{ margin: 5 }}
                    bordered
                    loading={locations == null}
                    dataSource={locations}
                    columns={columns}
                />
            </Row>
        </>
    );
};
