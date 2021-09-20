import { settings } from '../settings';
import { createClient } from '@supabase/supabase-js';

const { uri, apiKey } = settings.supabase;
export const supabase = createClient(uri, apiKey);