import React, { useCallback, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { settings } from './settings';

//TODO: Amhed: Move to its own file
interface MapMarkerProps {
  lat: number
  lng: number
  text: string
  visible?: boolean
}
export const MapMarker = (props: MapMarkerProps) => {
  if (props.visible) {
    return <div>{'🔥'}</div>
  }

  return null;
}

interface MapDemoProps {
  center: {
    lat: number
    lng: number
  },
  zoom: number
}

export const MapDemo = (props: MapDemoProps) => {
  const [cursorPosition, setCursorPosition] = useState<MapMarkerProps>({
    lat: props.center.lat,
    lng: props.center.lng,
    text: 'cursor',
    visible: false
  })

  const handleMapClick = (event: GoogleMapReact.ClickEventValue) => {
    setCursorPosition({
      ...cursorPosition,
      lat: event.lat,
      lng: event.lng,
      visible: true
    });
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: settings.googleMaps.apiKey }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onClick={handleMapClick}
      >
        <MapMarker {...cursorPosition} />
      </GoogleMapReact>
    </div>
  );
}