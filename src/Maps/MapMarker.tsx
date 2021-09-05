import React from 'react';

export interface MapMarkerProps {
  lat: number
  lng: number
  text: string
  visible?: boolean
}

export const MapMarker = (props: MapMarkerProps) => {
  if (props.visible) {
    return (
      <div>{'🔥'}</div>
    );
  }

  return null;
};