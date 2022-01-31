import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { settings } from 'settings';

interface MapViewerModalProps {
  adress?: string;
  lat: number;
  lon: number;
}
export const MapViewerModal = (props: MapViewerModalProps) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        View on map
      </Button>
      <Modal
        title={props.adress}
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        width={700}
        closable={false}
      >
        <StaticGoogleMap size="1000x1000" className="img-fluid" apiKey={settings.googpleMaps.apiKey}>
          <Marker location={`${props.lat},${props.lon}`} color="red" label="Pkmcndknmvcdkv" />
        </StaticGoogleMap>
      </Modal>
    </>
  );
};