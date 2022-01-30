import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { settings } from 'settings';

const { uri, apiKey } = settings.supabase;
let client: SupabaseClient;

//Singleton Pattern
export const getSupabaseClient = () => {
  if (client == null) {
    client = createClient(uri, apiKey);
  }

  return client;
};