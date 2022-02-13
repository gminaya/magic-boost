import { Divider, Button, Drawer } from 'antd';
import { CampaignList } from './CampaignList';
import { NewCampaignForm } from './NewCampaignForm';
import { useToggleDrawer } from 'hooks/useToggleDrawer';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import 'styles/pages/campaignAdmin.scss';

export const CampaignAdmin = () => {
  const {drawerIsVisible, toggleDrawer} = useToggleDrawer();

  return (
    <>
      <Drawer
        className="formDrawer"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerIsVisible}
        key="left"
        width="90%"
        closeIcon={<CloseOutlined />}
      >
        <header className="drawer-title">
          <h1>
            New Campaign
          </h1>
        </header>
        <NewCampaignForm />
      </Drawer>

      <Divider className="title-divider" orientation="left">
        <h2>
          Campaigns
        </h2>
      </Divider>

      <Button type="primary" onClick={toggleDrawer} icon={<PlusOutlined />} size={'small'}>
        ADD NEW CAMPAING
      </Button>

      {/* TODO: Spacing! */}
      <CampaignList />
    </>
  );
};
