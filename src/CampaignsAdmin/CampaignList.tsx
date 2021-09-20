import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Table, Button, Popconfirm } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getCampaigns, deleteCampaign } from '../db/Campaigns';
import { definitions } from '../db/supabase';
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
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (_: unknown, record: definitions['Campaigns']) => {
        return (
          <Popconfirm
            title="Are you sure to delete this campaign 🧐?"
            onConfirm={async () => {
              await deleteCampaign(record.id);              
              triggerGetCampaigns();
            }}
            okText="Yes"
            cancelText="No"
          >
            {' '}
            <Button type="primary" icon={<DeleteOutlined />} size={'small'}>Remove</Button>
          </Popconfirm>
        );
      },
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (_: unknown, record: definitions['Campaigns']) => {
        return (
          <Link target={'_blank'} key={record.id} to={`/CampaignsAdmin/${record.id}`}>
            <Button type="primary" icon={<EyeOutlined />} size={'small'}></Button>
          </Link>
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
