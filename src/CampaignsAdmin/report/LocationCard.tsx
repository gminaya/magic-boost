import React from 'react';
import './locationCard.css';
import { Image, Badge } from 'antd';
import { CampaignLocationInfo } from '../../models/CampaignLocationInfo';

interface LocationCardInfo extends CampaignLocationInfo  {
  cardSize?: number
}
export const LocationCard = (location: LocationCardInfo) => {
  
  const cardSizeProp ={
    width: location.cardSize
  };
  return (
    <div style={cardSizeProp} className="location-card">

      <Image className="card-image" width="auto" height="100%" src={location.photoUrl} />
      <Badge.Ribbon className="badge-text" text="659,552 month views" color="#173057" placement="start">
        <div className="stats"></div>
      </Badge.Ribbon>
      <div className="card-info">
        <h3>{location.name}</h3>
        <p>{location.address}</p>
        <a>VER EN MAPA</a>
      </div>
    </div>
  );
};
