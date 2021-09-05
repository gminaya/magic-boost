import { useCallback, useEffect, useState } from 'react';
import { CampaignLocationInfo } from '../../models/CampaignLocationInfo';
import { CampaignModel } from '../../models/CampaignModel';
import { getCampaignByID } from '../Campaigns';

export const useCampaignById = (id: number) => {
  const [campaign, setCampaign] = useState<CampaignModel>();

  const refreshCampaign = useCallback(async () => {
    const result = (await getCampaignByID(id)) as CampaignModel;

    if(result == null){
      return;
    }
    
    if (result?.location_config) {
      const locationInfo = JSON.parse(result.location_config) as CampaignLocationInfo[];
      result.locationInfo = locationInfo;
    }

    setCampaign(result);
  },[getCampaignByID, setCampaign]);

  useEffect(()=>{
    refreshCampaign();
  },[]);

  return{campaign, refreshCampaign};
};
