import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, message, DatePicker, Row, Col, Table, List } from 'antd';
import { useLocations } from '../db/hooks/getLocations';
import { definitions } from '../db/supabase';
import { insertNewCampaign } from '../db/Campaigns';
import './NewCampaignForm.css';

export const NewCampaignForm = () => {
    //date to initialise dueDate state
    const date: Date = new Date();
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState(date);
    const [addedLocations, updateAddedLocations] = useState<any>([]);

    //success message on sumit
    const success = () => {
        message.success('Your new campaign has saved 😁');
    };

    //error message on sumit
    const error = () => {
        message.error('oh no! something went wrong 😩');
    };

    //returns an object with a location info to be added addedLocations states
    const locationObj = (id: number, name: string, address: string) => {
        return {
            id: id,
            name: name,
            address: address,
            photoURL: '',
        };
    };

    //updates addedLocations state
    const addLocationForCampaign = (location: any) => {
        updateAddedLocations([...addedLocations, locationObj(location.id, location.name, location.address)]);
    };

    const { locations, refreshLocations } = useLocations();

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
    type RequiredMark = boolean | 'optional';

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
            name: 'add',
            key: 'add',
            render: (_: any, record: definitions['Locations']) => {
                return (
                    //por que se ejecuta en todas las filas en la primera vez que renderiza?
                    <Button
                        type="primary"
                        onClick={() => {
                            addLocationForCampaign(record);
                        }}
                        icon={<PlusOutlined />}
                        size={'small'}
                    >
                        ADD
                    </Button>
                );
            },
        },
    ];

    //Saves new campaign in DB
    const OnSummit = async () => {
        if (addedLocations.length < 1) {
            message.info('add at least one location 🙏');
            return;
        }
        const locationsOnThisCamp = JSON.stringify(addedLocations);
        const response = await insertNewCampaign(name, 'none', locationsOnThisCamp, dueDate);

        if (response) {
            success();
        } else {
            error();
        }
    };

    return (
        <>
            <Form
                className="form-row"
                form={form}
                preserve={false}
                onFinish={OnSummit}
                onFinishFailed={onFinishFailed}
                layout={'horizontal'}
                initialValues={{ requiredMarkValue: requiredMark }}
                requiredMark={requiredMark}
            >
                <h2>Create new campaign</h2>
                <Row>
                    <Col span={5}>
                        <Form.Item
                            className="text-input-item"
                            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                            requiredMark={true}
                            label="Campaign Name"
                            name="name"
                            tooltip="The name have to be as the client named the campaign"
                            rules={[{ required: true, message: 'Name can not be empty 🤨' }]}
                        >
                            <Input
                                size={'large'}
                                placeholder="Type campaign name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <Form.Item
                            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                            requiredMark={true}
                            label="Due Date"
                            tooltip="Due Date is the due date for the report to be delivery"
                            name="dueDate"
                            rules={[{ required: true, message: 'Due date can not be empty 😒' }]}
                        >
                            <DatePicker
                                size={'large'}
                                onSelect={(e) => {
                                    const date = new Date(e.toString());
                                    setDueDate(date);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} className="location-table">
                        <h3>Available locations to add</h3>
                        <Table
                            size={'small'}
                            style={{ margin: 5 }}
                            bordered
                            loading={locations == null}
                            dataSource={locations}
                            columns={columns}
                        />
                    </Col>
                    <Col span={6} offset={2} className="added-locations">
                        <h3>Added Locations</h3>
                        <List
                            size="small"
                            bordered
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={addedLocations.map(
                                (location: {
                                    id: React.Key | null | undefined;
                                    name:
                                        | boolean
                                        | React.ReactChild
                                        | React.ReactFragment
                                        | React.ReactPortal
                                        | null
                                        | undefined;
                                }) => {
                                    return location.name;
                                }
                            )}
                            renderItem={(item: string) => <List.Item key={item}>{item}</List.Item>}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col offset={20} span={4}>
                        <Form.Item>
                            <Button size={'large'} type="primary" htmlType="submit">
                                SAVE CAMPAIGN
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
