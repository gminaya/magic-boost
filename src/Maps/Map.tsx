import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { settings } from '../settings';
import { MapMarker, MapMarkerProps } from './MapMarker';

interface MapProps {
  center?: {
    lat?: number
    lng: number
  },
  zoom?: number
}

export const Map = (props: MapProps) => {

  const [cursorPosition, setCursorPosition] = useState<MapMarkerProps>({
    lat: Number(props.center?.lat),
    lng: Number(props.center?.lng)

  });


  return (
    <div style={{ height: '80%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDc4hp1XK5k70sAiA92BIHuZtWzzHXRHf8' }}
        defaultCenter={cursorPosition}
        defaultZoom={settings.googpleMaps.defaulZoom}
      >
        <MapMarker lat={18.4482008}
          lng={-69.9614988} />
      </GoogleMapReact>
    </div>
  );
};
