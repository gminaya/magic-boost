import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { settings } from '../settings';
import { definitions } from '../db/supabase';
import { useParams } from 'react-router-dom';
import { CampaignLocationInfo } from '../models/CampaignLocationInfo';

export function CampaignDetails() {
  const [location, setLocation] = useState<string>();
  const [dueDate, setDueDate] = useState<Date>();
  const [campaignLocationInfo, setCampaignLocationInfo] = useState<CampaignLocationInfo>();
  type CampaignParams = {
    id: string;
  };

  const { id } = useParams<CampaignParams>();

  useEffect(() => {
    getCampaignDetails();
  }, [id]);

  const getCampaignDetails = async () => {
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);

    //TODO: Encapsulate into its own hook?
    const { data } = await supabase
      .from<definitions['Campaigns']>('Campaigns')
      .select()
      .eq('id', Number(id))
      .single();

    if (data !== null) {
      setLocation(data.name);
      setDueDate(data.dueDate as any);
      setCampaignLocationInfo(JSON.parse(data.location_config || ''));
    }
  };

  return (
    <>
      <h1> {location} </h1>;
    </>
  );
}
