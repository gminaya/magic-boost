import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { settings } from '../settings';
import { MapMarker, MapMarkerProps } from './MapMarker';

interface MapDemoProps {
  center?: {
    lat: number
    lng: number
  },
  zoom?: number
}

export const MapDemo = (props: MapDemoProps) => {
  const defaultCenter = settings.googleMaps.defaultCenter;
  const [cursorPosition, setCursorPosition] = useState<MapMarkerProps>({
    lat: props.center?.lat || defaultCenter.lat,
    lng: props.center?.lng || defaultCenter.lng,
    text: 'cursor',
    visible: false
  });

  const handleMapClick = (event: GoogleMapReact.ClickEventValue) => {
    setCursorPosition({
      ...cursorPosition,
      lat: event.lat,
      lng: event.lng,
      visible: true
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: settings.googleMaps.apiKey }}
        defaultCenter={settings.googleMaps.defaultCenter}
        defaultZoom={props.zoom || settings.googleMaps.defaultZoom}
        onClick={handleMapClick}
      >
        <MapMarker {...cursorPosition} />
      </GoogleMapReact>
    </div>
  );
};