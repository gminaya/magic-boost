import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { settings } from '../settings';
import { definitions } from '../db/supabase';
import { useParams } from 'react-router-dom';

export function CampaignDetails() {
  const [loca, setLoca] = useState<string>();
  const [dueDate, setDueDate] = useState<Date>();
  const [locationsDetails, setLocationsDetails] = useState<any>();
  type CampaignParams = {
    id: string;
  };
  const { id } = useParams<CampaignParams>();

  useEffect(() => {
    getCampaignDetails();
    console.log(locationsDetails);
  }, []);

  const getCampaignDetails = async () => {
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);

    const { data, error } = await supabase
      .from<definitions['Campaigns']>('Campaigns')
      .select()
      .eq('id', Number(id));

    if (data !== null) {
      setLoca(data[0].name);
      setDueDate(data[0].dueDate as any);
      setLocationsDetails(JSON.parse(data[0].location_config as any));
    }
  };
  return (
    <>
      <h1> {loca} </h1>;
    </>
  );
}
