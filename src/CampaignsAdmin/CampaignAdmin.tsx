import React, { useState } from 'react';
import { Divider, Button, Drawer } from 'antd';
import { CampaignList } from './CampaignList';
import { NewCampaignForm } from './NewCampaignForm';
import {  PlusOutlined, CloseOutlined } from '@ant-design/icons';

function CampaignAdmin() {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisibility(!drawerVisibility);
  };

  return (
    <>
      <Drawer
        title="Create a new campaign"
        placement="top"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisibility}
        key="top"
        height="90%"
        closeIcon={<CloseOutlined />}
      >
        <NewCampaignForm />
      </Drawer>
      <Divider style={{ borderTopColor: 'gray' }} orientation="left">
        <h2 style={{ marginBottom: 0 }}>CAMPAIGNS KINDOM</h2>
      </Divider>

      <p style={{ textAlign: 'right' }}>You can create, view or delete campaigns </p>
      <Button type="primary" onClick={toggleDrawer} icon={<PlusOutlined />} size={'small'}>
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
