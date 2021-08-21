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
export const insertNewCampaign = async (name: string, status: string) => {
    const { uri, apiKey } = settings.supabase;
    const supabase = createClient(uri, apiKey);

    const { data, error } = await supabase.from<definitions['Campaigns']>('Campaigns').insert([{ name, status }]);

    if (error) {
        throw new Error('Could not insert campaign');
    }

    return true;
};

//Deletes a row based on it's ID

export const deleteCampaign = async (id:number) => {
    const {uri, apiKey} = settings.supabase;
    const supabase = createClient(uri, apiKey);

    const {data, error} = await supabase.from('Campaigns').delete().eq('id', id);
    
    if(error){
        throw new Error('Could not delete campaign');
    }

    return true;
};