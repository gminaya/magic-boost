import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, message, DatePicker, Row, Col, Table, List } from 'antd';
import { useLocations } from '../db/hooks/getLocations';
import { definitions } from '../db/supabase';
import { insertNewCampaign } from '../db/Campaigns';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import './NewCampaignForm.css';

export const NewCampaignForm = () => {
  //date to initialise dueDate state  
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  
  const { locations } = useLocations();
  const [form] = Form.useForm();

  const [campaignLocations, setCampaignLocations] = useState<CampaignLocationInfo[]>([]);

  //success message on sumit
  const success = () => {
    message.success('Your new campaign has saved 😁');
  };

  //error message on sumit
  const error = () => {
    message.error('oh no! something went wrong 😩');
  };

  //updates addedLocations state
  const addLocationForCampaign = (location: definitions['Locations']) => {
    setCampaignLocations([
      ...campaignLocations, 
      {
        ...location,
        photoUrl: ''
      }
    ]);
  };

  //TODO: Amhed: Update to use correct model
  const onFinishFailed = (errorInfo: ValidateErrorEntity<any>) => {
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
    if (campaignLocations.length < 1) {
      message.info('add at least one location 🙏');
      return;
    }
    const locationsOnThisCamp = JSON.stringify(campaignLocations);
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
        initialValues={{ requiredMarkValue: 'optional' }}
        requiredMark={true}
      >
       
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
              dataSource={campaignLocations.map(loc => loc.name)}
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
