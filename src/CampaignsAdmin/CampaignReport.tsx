import React from 'react';
import './campaingReport.css';
import { Image, Badge } from 'antd';

export const CampaignReport = () => {
  return (
    <div className="location-card">
      <Image
        width="auto"
        height="100%"
        src="https://www.sarmiento.com.do/wp-content/uploads/2018/06/mobiliario_urbano_lcd_publicidad_sarmiento_republica_dominicana.jpg"
      />
      <Badge.Ribbon className="badge-text" text="659,552 month views" color="#173057" placement="start">
        <div className="stats"></div>
      </Badge.Ribbon>
      <div className='card-info'>
        <h3>Location Name</h3>
        <span>Location direction details esq more details</span>
      </div>
    </div>
  );
};
