import React, { useCallback, useEffect, useState } from 'react';
import { getCampaignByID } from '../Campaigns';
import { definitions } from '../supabase';


type CampaignResult = definitions['Campaigns'];

export const useCampaigID = (id: number) => {
  const [campaign, setCampaign] = useState<CampaignResult>();

  const refreshCampaign = useCallback(async () => {
    const result = await getCampaignByID(id);

    if(result == null){
      return;
    }
    
    setCampaign(result);
  },[getCampaignByID, setCampaign]);

  useEffect(()=>{
    refreshCampaign();
  },[]);

  return{campaign, refreshCampaign};
};
