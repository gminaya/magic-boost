export interface MapMarkerProps {
  lat: number
  lng: number
}

export const MapMarker = ({ lat, lng }: MapMarkerProps) => {


  return (
    <>
      <div>{lat}</div>
      <div>{lng}</div>
      <div>{'🔥'}</div>
    </>
  );


  return null;
};