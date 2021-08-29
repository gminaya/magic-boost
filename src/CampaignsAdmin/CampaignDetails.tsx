import React, { useEffect, useState } from 'react';
import { useCampaigID } from '../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { Table, Divider, Tag } from 'antd';

const today = new Date();

interface CampaignDetails {
  locationList: JSON;
}

type CampaignParams = {
  id: string;
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
    key: 'adress',
  },
  {
    title: 'Photo',
    dataIndex: 'photoURL',
    key: 'photoURL',
  },
];

export function CampaignDetails() {
  const [campaignLocationInfo, setCampaignLocationInfo] = useState<CampaignLocationInfo[]>([]);
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaigID(Number(id));

  useEffect(() => {
    if (campaign?.location_config) {
      const locationInfo = JSON.parse(campaign.location_config) as CampaignLocationInfo[];
      setCampaignLocationInfo(locationInfo);
    }
  }, [campaign]);

  return (
    <>
      <Divider orientation={'left'}>
        <span>You are seeing the campaign locations info of:</span>
        <h1> {campaign?.name} </h1>
      </Divider>

      <span>
        The status of this report is <DueDateLabel date={campaign?.dueDate} />
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

//TODO: Move to its own file?
interface DateLabelProps {
  date?: string;
}

const DueDateLabel = ({date}: DateLabelProps) => {
  if (!date) {
    return <Tag color="geekblue">UNKNOW</Tag>;
  }

  const formatedDueDate = new Date(date);
  return today < formatedDueDate 
    ? <Tag color="green">ON TIME</Tag> 
    : <Tag color="volcano">OVERDUE</Tag>;
};
