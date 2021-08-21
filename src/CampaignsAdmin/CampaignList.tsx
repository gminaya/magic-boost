/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import { DeleteOutlined, CheckCircleTwoTone, HourglassTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import { getCampaigns, deleteCampaign } from '../db/Campaigns';
import { definitions } from '../db/supabase';

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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, record: definitions['Campaigns']) => {
                switch (record.status) {
                case 'done':
                    return <CheckCircleTwoTone style={{fontSize:'1.5rem'}} twoToneColor="#1ac425" />;
                    break;
                case 'overdue':
                    return <ExclamationCircleTwoTone style={{fontSize:'1.5rem'}}  twoToneColor="#eb2f96" />;
                    break;
                case 'pending':
                    return <HourglassTwoTone style={{fontSize:'1.5rem'}}  twoToneColor="#c1c41a" />;
                    break;
                
                }
            },
        },
        {
            title: 'Remove',
            dataIndex: 'remove',
            key: 'remove',
            render: (_: any, record: definitions['Campaigns']) => {
                return <Button type="primary" icon={<DeleteOutlined />} size={'large'} />;
            },
        },
    ];

    return (
        <Table style={{ margin: 5 }} bordered loading={campaigns == null} dataSource={campaigns} columns={columns} />
    );
};
