import React, { useState, useEffect } from 'react';
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

  return (
    <PageHeader
      className="page-header"
      ghost={false}
      onBack={() => window.history.back()}
      title={campaign?.name}
      subTitle={<DueDateLabel date={campaign?.dueDate} />}
      extra={[
        <Button key="3">ARCHIVE</Button>,
        <Button key="2">SHARE</Button>,

        <PrintToPdf campaign={campaign} key={'4'} />

      ]}
    >

      <div className="location-card-size-slider">
        <span>Image size:</span>
        <Radio.Group defaultValue="small">
          <Radio.Button onClick={() => setLocationCardSize(300)} value='small'>small</Radio.Button>
          <Radio.Button onClick={() => setLocationCardSize(500)} value='medium'>Medium</Radio.Button>
          <Radio.Button onClick={() => setLocationCardSize(800)} value='large'>LARGE</Radio.Button>
        </Radio.Group>
      </div>
      <div className="cards-container">
        {locationList.map((location) => (
          <LocationCard {...location} cardSize={locationCardSize} key={location.id} />
        ))}
      </div>
    </PageHeader>
  );
};