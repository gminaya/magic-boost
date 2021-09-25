import React, { useState, useEffect } from 'react';
import { useCampaignById } from '../../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { LocationCard } from './LocationCard';
import './report.css';
import { CampaignLocationInfo } from '../../models/CampaignLocationInfo';
import { PageHeader, Button, Slider } from 'antd';

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
      subTitle="due date label here"
      extra={[
        <Button key="3">ARCHIVE</Button>,
        <Button key="2">SHARE</Button>,
        <Button key="1" type="primary">
          GENERATE PDF
        </Button>,
      ]}
    >
      <div className="location-card-size-slider">
        <span>Image size</span>
        <Slider
          marks={{300:'-',800:'+'}}
          min={300}
          max={800}
          onChange={(e) => {
            setLocationCardSize(e);
          }}
          defaultValue={400}
        />
      </div>
      <div className="cards-container">
        {locationList.map((location) => (
          <LocationCard {...location} cardSize={locationCardSize} key={location.id} />
        ))}
      </div>
    </PageHeader>
  );
};
