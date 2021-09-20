import { definitions } from './supabase';
import { settings } from '../settings';
import { createClient } from '@supabase/supabase-js';

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
export const insertNewLocation = async (name: string, address: string, lat: number, lon: number) => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);

  const { error } = await supabase.from<definitions['Locations']>('Locations').insert([
    {
      name,
      address,
      lat,
      lon,
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


export const uploadPhoto = async () => {
  const { uri, apiKey } = settings.supabase;
  const supabase = createClient(uri, apiKey);
  
  const { data, error } = await supabase.storage.from('location-pictures').upload('app-background.jpg', 'src/app-background.jpg', {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    throw new Error('Could not upload the picture');
  }

  return data;
};
