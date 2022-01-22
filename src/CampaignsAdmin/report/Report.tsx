import React, { useState, useEffect, useMemo } from 'react';
import { useCampaignById } from '../../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { LocationCard } from './LocationCard';
import { CampaignLocationInfo } from '../../models/CampaignLocationInfo';
import { DueDateLabel } from '../DueDateLabel';
import { PageHeader, Button, Radio } from 'antd';
import './report.css';

import { PrintToPdf } from './pdf/PrintToPdf';



export const Report = () => {
  type CampaignParams = {
    id: string;
  };
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaignById(Number(id));
  const [locationList, setLocationList] = useState<CampaignLocationInfo[]>([]);
  const [locationCardSize, setLocationCardSize] = useState(400);
  useEffect(() => {
    if (campaign?.locationInfo) {
      setLocationList(campaign.locationInfo);
    }
  }, [campaign]);

  const actions = useMemo(() => {
    const arr = [
      <Button key='ARCHIVE'>ARCHIVE</Button>,
      <Button key='SHARE'>SHARE</Button>,
    ];
    if (campaign) {
      arr.push(<PrintToPdf key='PRINT' campaign={campaign} />);
    }

    return arr;
  }, [campaign]);

  return (
    <PageHeader
      className='page-header'
      ghost={false}
      onBack={() => window.history.back()}
      title={campaign?.name}
      subTitle={<DueDateLabel date={campaign?.dueDate} />}
      extra={actions}
    >
      <div className='cards-container'>
        {locationList.map((location) => (
          <LocationCard {...location} cardSize={locationCardSize} key={location.id} />
        ))}
      </div>

    </PageHeader>
  );
};
