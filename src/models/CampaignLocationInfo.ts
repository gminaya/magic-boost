import { definitions } from 'db/SupabaseTypes';

type Location = definitions['Locations'];

export interface CampaignLocationInfo extends Location {}