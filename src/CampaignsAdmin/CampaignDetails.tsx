import React, { useMemo } from 'react';
import { useCampaignById } from '../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';
import { Table, Divider, Tag, Input, Image, message } from 'antd';
import { settings } from '../settings';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import {CampaignReport} from './CampaignReport';

interface CampaignDetails {
  locationList: JSON;
}

type CampaignParams = {
  id: string;
};

export function CampaignDetails() {
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaignById(Number(id));

  /**
   *uploads selected image to supabase DB
   */
  const uploadImageToSupabase = async (file: File) => {
    const filename = `${uuidv4()}.jpg`;
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);

    const { data, error } = await supabase.storage.from('location-pictures').upload(`public/${filename}`, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/jpg',
    });

    if (error) {
      alert(error?.message);
    }

    return data?.Key;
  };

  /**
   * Retrieves public uploaded image URL from supabase
   */
  const getUploadedImageURL = async (imagePath: string) => {
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);
    const { publicURL, error } = await supabase.storage.from('location-pictures').getPublicUrl(imagePath);

    if (error) {
      alert(error?.message);
    }

    if (publicURL) {
      return publicURL;
    }
  };

  /**
   * Modifies location object imageUrl key based on its index with photo public url
   */
  const updatePhotoUrlKey = (locationID: number, imageURL: string) => {
    const locationToUpdate = campaign?.locationInfo.find((loc) => loc.id === locationID);
    if (locationToUpdate) {
      locationToUpdate.photoUrl = imageURL;
    }
  };

  /**
   *updates campaing locationConfig on supabase
   */
  const updateLocationConfig = async (campaignID: number, locationCONF: CampaignLocationInfo[] | undefined) => {
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);

    const { data, error } = await supabase
      .from('Campaigns')
      .update({ location_config: JSON.stringify(locationCONF) })
      .eq('id', campaignID);

    if (error) {
      alert(error);
    }

    return data;
  };
  
  /**
   * Handle for OnChange on ADD button input
   */
  const addBtnOnChange = async (file: File, locationID: number) => {
    const uploadedPath = await uploadImageToSupabase(file);
    if (uploadedPath) {
      const path = uploadedPath.substr(uploadedPath.indexOf('/') + 1);
      const URL = await getUploadedImageURL(path);
      if (URL) {
        updatePhotoUrlKey(locationID, URL);
      }
    }
    const updateLocationConfigResult = await updateLocationConfig(Number(id), campaign?.locationInfo);
    if (updateLocationConfigResult) {
      uploadedPhotoMessage();
    }
  };

  /**
   * locations list table columns config
   */
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
      title: 'ADD Photo',
      dataIndex: 'photoURL',
      key: 'photoURL',
      render: (_: unknown, record: CampaignLocationInfo) => {
        return (
          <Input
            accept="image/jpg"
            type="file"
            onChange={(e) => {
              e.target.files && addBtnOnChange(e.target.files[0], record.id);
            }}
          />
        );
      },
    },
    {
      title: 'View Photo',
      dataIndex: 'viewPhoto',
      key: 'viewPhoto',
      render: (_: unknown, record: CampaignLocationInfo) => {
        return <Image width={50} src={record.photoUrl} />;
      },
    },
  ];

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
        loading={campaign == null}
        dataSource={campaign?.locationInfo}
        columns={columns}
        rowKey="id"
      />
      <CampaignReport />
    </>
  );
}

//TODO: A: Move to its own file? G:
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

const uploadedPhotoMessage = () => {
  message.success('Photo uploaded ');
};
