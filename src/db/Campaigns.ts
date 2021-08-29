import { definitions } from './supabase';
import { settings } from '../settings';
import { createClient } from '@supabase/supabase-js';

// Gets a list of all campaigns
export const getCampaigns = async () => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { data, error } = await supabase.from<definitions['Campaigns']>('Campaigns').select();
  return data;
};



//Inserts a new campaign
export const insertNewCampaign = async (name: string, status = '', location_config: string, dueDate: Date) => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { data, error } = await supabase
    .from<definitions['Campaigns']>('Campaigns')
    .insert([{ name, status, location_config, dueDate }] as any);

  if (error) {
    throw new Error('Could not insert campaign');
  }

  return true;
};

//gets an especific campaign by its ID
export const getCampaignByID = async (id:number) => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  //TODO: Encapsulate into its own hook?
  const { data } = await supabase.from<definitions['Campaigns']>('Campaigns').select().eq('id', Number(id)).single();

  if (data !== null) {
    return data;
  }
};
//Deletes a row based on it's ID

export const deleteCampaign = async (id: number) => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { data, error } = await supabase.from('Campaigns').delete().eq('id', id);

  if (error) {
    throw new Error('Could not delete campaign');
  }

  return true;
};
