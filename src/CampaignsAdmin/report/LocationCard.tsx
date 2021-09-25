import React from 'react';
import './locationCard.css';
import { Image, Badge } from 'antd';


 interface LocationCardInfo {
  name?: string;
  address?: string;
  photoUrl?: string;
}
export const LocationCard = (location: LocationCardInfo) => {
  return (
    <div className="location-card">

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
