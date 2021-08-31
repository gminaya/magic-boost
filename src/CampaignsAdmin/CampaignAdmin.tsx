import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Divider, Button, Drawer } from 'antd';
import { CampaignList } from './CampaignList';
import { NewCampaignForm } from './NewCampaignForm';
import { RedoOutlined, PlusOutlined } from '@ant-design/icons';

function CampaignAdmin() {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const toggleDrawser = () => {
    if (drawerVisibility) {
      setDrawerVisibility(false);
    } else {
      setDrawerVisibility(true);
    }
  };

  return (
    <>
      <Drawer
        title="Create a new campaign"
        placement="top"
        closable={false}
        onClose={toggleDrawser}
        visible={drawerVisibility}
        key="top"
        height="90%"
      >
        <NewCampaignForm />
      </Drawer>
      <Divider style={{ borderTopColor: 'gray' }} orientation="left">
        <h2 style={{ marginBottom: 0 }}>CAMPAIGNS KINDOM</h2>
      </Divider>

      <p style={{ textAlign: 'right' }}>You can create, view or delete campaigns </p>
      <Button type="primary" onClick={toggleDrawser} icon={<PlusOutlined />} size={'small'}>
        ADD NEW CAMPAING
      </Button>

      <Divider style={{ borderTopColor: 'gray' }} orientation="left">
        <h4 style={{ marginBottom: 0 }}>Listing all the campaigns</h4>
      </Divider>
      <div id="campaign-list"></div>
      <CampaignList />
    </>
  );
}

export default CampaignAdmin;
