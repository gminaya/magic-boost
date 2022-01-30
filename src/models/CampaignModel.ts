import { definitions } from 'db/SupabaseTypes';
import { CampaignLocationInfo } from './CampaignLocationInfo';

type SupabaseCampaignDefinition = definitions['Campaigns'];
export interface CampaignModel extends SupabaseCampaignDefinition {
  locationInfo: CampaignLocationInfo[];
}