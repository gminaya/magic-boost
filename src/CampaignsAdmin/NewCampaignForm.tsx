import React, { useState } from 'react';
import { PlusOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { Form, Button, Input, message, DatePicker, Row, Col, Table, List, Divider } from 'antd';
import { useLocations } from '../db/hooks/getLocations';
import { definitions } from '../db/supabase';
import { insertNewCampaign } from '../db/Campaigns';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import './NewCampaignForm.css';
import { CampaignModel } from '../models/CampaignModel';

export const NewCampaignForm = () => {

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
  const onFinishFailed = (errorInfo: ValidateErrorEntity<CampaignModel>) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
        return <>
          <Input
            autoFocus
            placeholder="Search by name"
            value={selectedKeys}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : confirm({ closeDropdown: false }));
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={() => { confirm(); }} />
          <Button
            type="primary"
            icon={<ClearOutlined />}
            size="large"
            onClick={() => { clearFilters(); }} />
        </>;
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value: any, record: definitions['Locations']) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
        return <>
          <Input
            autoFocus
            placeholder='Search by adress'
            value={selectedKeys}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }} />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={() => { confirm(); }} />
          <Button
            type="primary"
            icon={<ClearOutlined />} size="large"
            onClick={() => { clearFilters(); }} />
        </>;
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value: any, record: any) => {
        return record.address.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      title: 'Add',
      name: 'add',
      key: 'add',
      render: (_: unknown, record: definitions['Locations']) => {
        return (
          <Button
            type='primary'
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
          <Col className="campaign-input" span={12}>
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
                size="large"
                placeholder="Type campaign name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
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
          <Col span={24} className="location-table">
            <h3>ADD LOCATIONS TO THIS CAMPAIGN</h3>
            <Table
              size="small"
              style={{ margin: 5 }}
              bordered
              loading={locations == null}
              dataSource={locations}
              columns={columns}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} className="added-locations">
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
        <Divider></Divider>
        <Row>
          <Col offset={20} span={4}>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit">
                  SAVE CAMPAIGN
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};