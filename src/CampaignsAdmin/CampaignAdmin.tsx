import { useState } from 'react';
import { Divider, Button, Drawer } from 'antd';
import { CampaignList } from './CampaignList';
import { NewCampaignForm } from './NewCampaignForm';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import 'styles/pages/campaignAdmin.scss';

function CampaignAdmin() {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisibility(!drawerVisibility);
  };

  return (
    <>
      <Drawer
        className="formDrawer"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisibility}
        key="left"
        width="90%"
        closeIcon={<CloseOutlined />}
      >
        <header className="drawer-title">
          <h1>
            Creating a new campaign
          </h1>
        </header>
        <NewCampaignForm />
      </Drawer>
      <Divider className="title-divider" orientation="left">
        <h2>
          CAMPAIGNS KINDOM
        </h2>
      </Divider>
      <p className="page-description">
        You can create, view or delete campaigns
      </p>
      <Button type="primary" onClick={toggleDrawer} icon={<PlusOutlined />} size={'small'}>
        ADD NEW CAMPAING
      </Button>
      <Divider className="title-divider" orientation="left">
        <span className="span-text">
          Listing all the campaigns
        </span>
      </Divider>
      <div id="campaign-list"></div>
      <CampaignList />
    </>
  );
}

export default CampaignAdmin;
