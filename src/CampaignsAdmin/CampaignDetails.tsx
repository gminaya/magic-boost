import React, { useEffect, useState } from 'react';
import { useCampaigID } from '../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { definitions } from '../db/supabase';
import { Table, Divider, Tag } from 'antd';


const today = new Date();

interface CampaignDetails {
  locationList: JSON;
}

export function CampaignDetails() {
  const [campaignName, setCampaignName] = useState<definitions['Campaigns']['name']>();
  const [dueDate, setDueDate] = useState<definitions['Campaigns']['dueDate']>();
  const [campaignLocationInfo, setCampaignLocationInfo] = useState<CampaignLocationInfo[]>([]);
  
  type CampaignParams = {
    id: string;
  };
  const { id } = useParams<CampaignParams>();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'adress',
    },
    {
      title: 'Photo',
      dataIndex: 'photoURL',
      key: 'photoURL',
    },
  ];
  const {campaign} = useCampaigID(Number(id));
  
  useEffect(()=>{
    setCampaignName(campaign?.name);
    setDueDate(campaign?.dueDate);
    
    if (campaign?.location_config) {
      const locationInfo = JSON.parse(campaign.location_config) as CampaignLocationInfo[];
      setCampaignLocationInfo(locationInfo);
    }

  },[campaign]);

  const getDueDateStatus = () =>{
    
    if (!dueDate) {
      return <Tag color="geekblue">UNKNOW</Tag>;
    }

    const formatedDueDate = new Date(dueDate);
    return today < formatedDueDate 
      ? <Tag color="green">ON TIME</Tag> 
      : <Tag color="volcano">OVERDUE</Tag>;
  };
  return (
    <>
      <Divider orientation={'left'}>
        <span>You are seeing the campaign locations info of:</span>
        <h1> {campaignName} </h1>
      </Divider>

      <span>
        The status of this report is {getDueDateStatus()} 
      </span>
      
      <Table
        size="small"
        style={{ margin: 5 }}
        bordered
        loading={campaignLocationInfo == null}
        dataSource={campaignLocationInfo}
        columns={columns}
        rowKey="id"
      />
    </>
  );
}

