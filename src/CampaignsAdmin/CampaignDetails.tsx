import React, { useMemo, useState } from 'react';
import { useCampaignById } from '../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { Table, Divider, Tag, Button } from 'antd';
import { uploadPhoto } from '../db/Locations';
import { settings } from '../settings';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

interface CampaignDetails {
  locationList: JSON;
}

type CampaignParams = {
  id: string;
};

export function CampaignDetails() {
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaignById(Number(id));

  const uploadImage = async (file: File) => {
    const filename = `${uuidv4()}.jpg`;
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);
    const { data, error } = await supabase
      .storage
      .from('location-pictures')
      .upload(
        `public/${filename}`,
        file, 
        {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/jpg'
        });

    if (error) {
      alert(error?.message);
    }

    return data;
  };

  //TODO: What's this
  const locationListConfig = campaign?.location_config === undefined ? [] : JSON.parse(campaign?.location_config);

  const columns = useMemo(() => {
    return [
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
        render: (_: unknown, record: CampaignLocationInfo) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                alert(record.name);
              }}
              size={'small'}
            >
              ADD
            </Button>
          );
        },
      },
    ];
  }, []);

  const [selectedFile, setSelectFiled] = useState<File|undefined>();

  return (
    <>
      <Divider orientation={'left'}>
        <span>You are seeing the campaign locations info of:</span>
        <h1> {campaign?.name} </h1>
      </Divider>
      <Button onClick={() => {
        if (selectedFile) {
          uploadImage(selectedFile);
        }
      }}>revelio</Button>
      <input onChange={(e) => setSelectFiled(e.target.files![0])} id="file" type="file" />
      <span>
        The status of this report is <DueDateLabel date={campaign?.dueDate} />
      </span>
      <Table
        size="small"
        style={{ margin: 5 }}
        bordered
        loading={campaign == null}
        dataSource={campaign?.locationInfo}
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

const DueDateLabel = ({ date }: DateLabelProps) => {
  const today = useMemo(() => new Date(), []);

  if (!date) {
    return <Tag color="geekblue">UNKNOW</Tag>;
  }

  const formatedDueDate = new Date(date);
  return today < formatedDueDate ? <Tag color="green">ON TIME</Tag> : <Tag color="volcano">OVERDUE</Tag>;
};
