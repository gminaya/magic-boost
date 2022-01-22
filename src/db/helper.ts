import { createClient } from '@supabase/supabase-js';
import { settings } from 'settings';

const { uri, apiKey } = settings.supabase;
export const supabase = createClient(uri, apiKey);