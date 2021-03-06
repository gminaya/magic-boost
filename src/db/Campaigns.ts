import { definitions } from './SupabaseTypes';
import { getSupabaseClient } from './DatabaseClient';

// Gets a list of all campaigns
export const getCampaigns = async () => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.from<definitions['Campaigns']>('Campaigns').select();

  if (error) {
    console.log(error);
    //TODO: Gabriel: Need to add support for Sentry or other similar error reporting tool
    //(sentry.io)
  }

  return data;
};



// Inserts a new campaign
//TODO: Amhed + Gabriel: Manage date conversions on a single place
export const insertNewCampaign = async (name: string, status = '', location_config: string, dueDate: Date) => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from<definitions['Campaigns']>('Campaigns')
    .insert([{ name, status, location_config, due_date: Intl.DateTimeFormat('en-US').format(dueDate) }]);

  if (error) {
    throw new Error('Could not insert campaign');
  }

  return true;
};

/**
 * gets an especific campaign by its ID
 */
export const getCampaignByID = async (id:number) => {
  const supabase = getSupabaseClient();

  //TODO: Amhed: Encapsulate into its own hook?
  const { data } = await supabase.from<definitions['Campaigns']>('Campaigns').select().eq('id', Number(id)).single();

  if (data !== null) {
    return data;
  }
};

/**
 * Deletes a row based on it's ID
 */
export const deleteCampaign = async (id: number) => {
  const supabase = getSupabaseClient();

  const { error } = await supabase.from('Campaigns').delete().eq('id', id);

  if (error) {
    throw new Error('Could not delete campaign');
  }

  return true;
};
