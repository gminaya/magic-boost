import { definitions } from './supabase';
import { createClient } from '@supabase/supabase-js';
import { settings } from 'settings';

/** Gets a list of all locations */
export const getLocations = async () => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { data, error } = await supabase.from<definitions['Locations']>('Locations').select();

  if (error) {
    //TODO: Gabriel: Handle error on sentry.io (here and below)
  }

  return data;
};

/** Inserts a new location */
export const insertNewLocation = async (name: string, address: string, lat: number, lon: number, format: string, picture: string, orientation: string) => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { error } = await supabase.from<definitions['Locations']>('Locations').insert([
    {
      name,
      address,
      lat,
      lon,
      format,
      picture,
      orientation,
    },
  ]);

  if (error) {
    //return false;
    throw new Error('Could not insert location');
  }

  return true;
};

//Deletes a row based on it's ID
export const deleteLocation = async (id: number) => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { error } = await supabase.from('Locations').delete().eq('id', id);

  if (error) {
    throw new Error('Could not delete location');
  }

  return true;
};



