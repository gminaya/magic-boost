import { definitions } from './supabase';
import { settings } from '../settings';
import { createClient } from '@supabase/supabase-js';

/** Gets a list of all locations */
export const getLocations = async () => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { data, error } = await supabase.from('Locations').select();
  return data;
}

/** Inserts a new location */
export const insertNewLocation = async (name: string, address: string, lat: number, lon: number) => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { data, error } = await supabase.from<definitions['Locations']>('Locations').insert([
    {
      name,
      address,
      lat,
      lon,
    }
  ])

  if (error) {
    throw new Error('Could not insert location')
  }

  return data;
}