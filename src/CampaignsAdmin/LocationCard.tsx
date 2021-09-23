import React from 'react';
import './locationCard.css';
import { Image, Badge } from 'antd';

export const LocationCard = () => {
  return (
    <div className="location-card">
      <Image
        className='card-image'
        width="auto"
        height="100%"
        src="https://www.sarmiento.com.do/wp-content/uploads/2018/06/mobiliario_urbano_lcd_publicidad_sarmiento_republica_dominicana.jpg"
      />
      <Badge.Ribbon className="badge-text" text="659,552 month views" color="#173057" placement="start">
        <div className="stats"></div>
      </Badge.Ribbon>
      <div className="card-info">
        <h3>Location Name</h3>
        <p>Location direction details esq more details</p>
        <a>VER EN MAPA</a>
      </div>
    </div>
  );
};
