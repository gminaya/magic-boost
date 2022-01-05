import React from 'react';
import { PrintToPdfProps } from './Models';
import './reportToPrint.css';

//TODO: Gabi: Change name to ReportTemplate or TemplateToPrint

export const ReportToPrint = React.forwardRef<HTMLInputElement, PrintToPdfProps>((
  {campaign}: PrintToPdfProps, 
  ref
) => {
  const numberOfLocations = campaign.locationInfo.length;

  return (

    <div ref={ref} >
      <div className='page frontPage'>
        <header >
          <h1 className='report-title'>
            Reporte fotográfico campaña: <br />
            {campaign.name}
          </h1>
        </header>
        <div>
          <h2 className='location-number'> {numberOfLocations} Locations</h2>
        </div>
        <div>
          <img alt='logo signmaster' className='logo' src='https://jojggjqetqmkxwbkxgbr.supabase.in/storage/v1/object/public/location-pictures/Nuevo Logo Signmaster Fondo Oscuro.png' />
        </div>
      </div>
      {
        campaign.locationInfo.map((location, index) => (
          <div key={index} className='page'>
            <div className='picture-cap'>
              <div className='location-picture '>
                <img src={location.photoUrl} />
              </div>
              <div className='location-cap'>
                <p> {location.address} </p>
              </div>
            </div>
            <div className='report-footer'>
              <div className='fill'>.</div>
              <div className='footer-img'>
                <img alt='logo signmaster' src='https://jojggjqetqmkxwbkxgbr.supabase.in/storage/v1/object/public/location-pictures/Nuevo Logo Signmaster Fondo Oscuro.png' />
              </div>
            </div>
          </div>
        ))
      }
    </div>


  );
});