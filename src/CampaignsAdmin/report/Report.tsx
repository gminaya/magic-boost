import React, { useState, useEffect } from 'react';
import { useCampaignById } from '../../db/hooks/getCampaignDetailsByID';
import { useParams } from 'react-router-dom';
import { LocationCard } from './LocationCard';
import './report.css';
import { CampaignLocationInfo } from '../../models/CampaignLocationInfo';

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
    <div className="cards-container">
      {
        locationList.map(location => <LocationCard key={location.id} {...location} />)
      }
    </div>
  );
};
