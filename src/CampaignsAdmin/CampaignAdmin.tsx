import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Divider, Button } from 'antd';
import { CampaignList } from './CampaignList';
import { NewCampaignForm } from './NewCampaignForm';
import { RedoOutlined } from '@ant-design/icons';

function CampaignAdmin() {

  const loadCampaignList = () => {
    ReactDOM.render(<CampaignList />, document.getElementById('campaign-list'));
  };


  return (
    <>
      <Divider style={{ borderTopColor: 'gray' }} orientation="left">
        <h2 style={{ marginBottom: 0 }}>CAMPAIGNS KINDOM</h2>
      </Divider>

      <p style={{ textAlign: 'right' }}>You can create, view or delete campaigns </p>

      <NewCampaignForm />

      <Divider style={{ borderTopColor: 'gray' }} orientation="left">
        <h4 style={{ marginBottom: 0 }}>Listing all the campaigns</h4>
      </Divider>
      <div id="campaign-list"></div>
      <Button type="primary" onClick={loadCampaignList} icon={<RedoOutlined />} size={'large'}>
        VIEW CAMPAIGNS LIST
      </Button>
    </>
  );
}

export default CampaignAdmin;
