import { definitions } from './SupabaseTypes';
import { getSupabaseClient } from './DatabaseClient';

export const getLocations = async () => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.from<definitions['Locations']>('Locations').select();

  if (error) {
    //TODO: Gabriel: Handle error on sentry.io (here and below)
  }

  return data;
};

export const insertNewLocation = async (
  //TODO: Amhed: Set eslint or prettier rule to break apart params
  name: string,
  address: string,
  lat: number,
  lon: number,
  format: string,
  picture_url: string,
  orientation: string
) => {
  const supabase = getSupabaseClient();

  //TODO: Amhed: Cleanup definitions[] usage. We should use better types
  const { error } = await supabase.from<definitions['Locations']>('Locations').insert([
    {
      name,
      address,
      lat,
      lon,
      format,
      picture_url,
      orientation,
    },
  ]);

  if (error) {
    //return false;
    throw new Error('Could not insert location');
  }

  return true;
};

export const deleteLocation = async (id: number) => {
  const supabase = getSupabaseClient();

  const { error } = await supabase.from('Locations').delete().eq('id', id);

  if (error) {
    throw new Error('Could not delete location');
  }

  return true;
};



