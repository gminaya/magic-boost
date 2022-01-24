import { definitions } from 'db/supabase';

type Location = definitions['Locations'];

export interface CampaignLocationInfo extends Location {
  photoUrl: string
}