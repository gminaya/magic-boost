import React, { useState, useEffect } from 'react';
import { useCampaignById } from '../../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { LocationCard } from './LocationCard';
import './report.css';
import { CampaignLocationInfo } from '../../models/CampaignLocationInfo';
import { PageHeader, Button } from 'antd';


export const Report = () => {
  type CampaignParams = {
    id: string;
  };
  const { id } = useParams<CampaignParams>();
  const { campaign } = useCampaignById(Number(id));
  const [locationList, setLocationList] = useState<CampaignLocationInfo[]>([]);
  useEffect(() => {
    if (campaign?.locationInfo) {
      setLocationList(campaign.locationInfo);
    }
  }, [campaign]);

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={campaign?.name}
      subTitle="due date label here"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <div className="cards-container">
        {locationList.map((location) => (
          <LocationCard key={location.id} {...location} />
        ))}
      </div>
    </PageHeader>
  );
};
