import { forwardRef } from 'react';
import { PrintToPdfProps } from './Models';
import { settings } from 'settings';
import { StaticGoogleMap, Marker } from 'react-static-google-map';
import 'styles/components/reportTemplate.scss';

export const ReportTemplate = forwardRef<HTMLInputElement, PrintToPdfProps>((
  { campaign }: PrintToPdfProps,
  ref
) => {
  const numberOfLocations = campaign.locationInfo.length;

  return (
    <div ref={ref} >
      <div className='front-page'>
        <header >
          <h1 className='report-title'>
            Reporte fotográfico campaña: <br />
            {campaign.name}
          </h1>
        </header>
        <div>
          <h2 className='location-number'>{ numberOfLocations } Locations</h2>
        </div>
        <div>
          <img alt='logo signmaster' className='logo' src='https://jojggjqetqmkxwbkxgbr.supabase.in/storage/v1/object/public/location-pictures/Nuevo Logo Signmaster Fondo Oscuro.png' />
        </div>
      </div>
      {
        campaign.locationInfo.map((location, index) => (
          <div key={index} className='slide'>
            <div className='picture-cap'>
              <div className='location-picture '>
                <figure>
                  <img src={location.campaignPhotoUrl} />
                </figure>
              </div>
              <div className='location-map'>
                <StaticGoogleMap size="410x500" className="img-fluid" apiKey={ settings.googleMaps.apiKey }>
                  <Marker location="6.4488387,3.5496361" color="red" label="Pkmcndknmvcdkv" />
                </StaticGoogleMap>
              </div>
            </div>
            <div className='report-footer'>
              <div className='fill'>
                <p className='location-adddres'>{location.address}</p>
              </div>
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