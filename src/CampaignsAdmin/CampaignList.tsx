import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Table, Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EyeOutlined,EditOutlined } from '@ant-design/icons';
import { getCampaigns, deleteCampaign } from 'db/Campaigns';
import { definitions } from 'db/supabase';
import moment from 'moment';

type CampaignsResult = Array<definitions['Campaigns']>;

export const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<CampaignsResult>();

  const triggerGetCampaigns = useCallback(async () => {
    const results = await getCampaigns();
    if (results == null) {
      return;
    }
    setCampaigns(results);
  }, [getCampaigns, setCampaigns]);

  useEffect(() => {
    triggerGetCampaigns();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (_: unknown, record: definitions['Campaigns']) => {
        return moment(record.dueDate).format('MMMM Do YYYY');
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: unknown, record: definitions['Campaigns']) => {
        return (
          <Button.Group>
            <Space>
              <Link target='_parent'   key={record.id} to={`/CampaignsAdmin/edit/${record.id}`}>
                <Button type="primary" icon={<EditOutlined />} size={'small'}>
                  Edit
                </Button>
              </Link>
              <Link target={'_parent'} key={record.id} to={`/CampaignsAdmin/report/${record.id}`}>
                <Button type="primary" icon={<EyeOutlined />} size={'small'}>
                  View
                </Button>
              </Link>
              <Popconfirm
                title="Are you sure to delete this campaign 🧐?"
                onConfirm={async () => {
                  await deleteCampaign(record.id);
                  triggerGetCampaigns();
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" icon={<DeleteOutlined />} size={'small'}>
                  Remove
                </Button>
              </Popconfirm>
            </Space>
          </Button.Group>
        );
      },
    },
  ];

  return (
    <>
      <Router>
        <Table
          size={'small'}
          style={{ margin: 5 }}
          bordered
          loading={campaigns == null}
          dataSource={campaigns}
          columns={columns}
          rowKey="id"
        />
      </Router>
    </>
  );
};
