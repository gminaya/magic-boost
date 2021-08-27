import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { settings } from '../settings';
import { definitions } from '../db/supabase';
import { useParams } from 'react-router-dom';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { Table, Divider } from 'antd';
import { DueDateStatus } from './DueDateStatus';

export function CampaignDetails() {
  const [locationName, setLocationName] = useState<string>();
  const [dueDate, setDueDate] = useState<Date>();
  const [campaignLocationInfo, setCampaignLocationInfo] = useState<CampaignLocationInfo[]>();
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

  useEffect(() => {
    getCampaignDetails();
  }, [id]);

  const getCampaignDetails = async () => {
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);

    //TODO: Encapsulate into its own hook?
    const { data } = await supabase.from<definitions['Campaigns']>('Campaigns').select().eq('id', Number(id)).single();

    if (data !== null) {
      setLocationName(data.name);
      setDueDate(data.dueDate as any);
      setCampaignLocationInfo(JSON.parse(data.location_config || ''));
    }
  };
  return (
    <>
      <Divider orientation={'left'}>
        <span>You are seeing the campaign locations info of:</span>
        <h1> {locationName} </h1>
      </Divider>

      <span>
        The status of this report is <DueDateStatus reportDueDate={dueDate} />
      </span>
      <Table
        size={'small'}
        style={{ margin: 5 }}
        bordered
        loading={campaignLocationInfo == null}
        dataSource={campaignLocationInfo}
        columns={columns}
      />
    </>
  );
}
