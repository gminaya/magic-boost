import React from 'react';
import { Divider } from 'antd';
import { CampaignList } from './CampaignList';
import { NewCampaignForm } from './NewCampaignForm';


function CampaignAdmin() {
  
    return (
        <>
            <Divider style={{ borderTopColor: 'gray' }} orientation="left">
                <h2 style={{ marginBottom: 0 }}>CAMPAIGNS KINDOM</h2>
            </Divider>

            <p style={{ textAlign: 'right' }}>You can view, create or delete campaigns </p>
            <CampaignList />

            <Divider style={{ borderTopColor: 'gray' }} orientation="left">
                <h4 style={{ marginBottom: 0 }}>please God, make this works 🙈 </h4>
            </Divider>
            <NewCampaignForm />
            
        </>
    );
}

export default CampaignAdmin;
