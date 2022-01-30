import { definitions } from 'db/supabase';

type SupabaseDefinitions = definitions['Locations'];

export type LocationFormat = 'billboard' | 'mini-billboard' | 'digital';

export type LocationOrientation = 'car-flow' | 'walker-flow' | 'NA';
export interface Location extends SupabaseDefinitions {
  format: LocationFormat;
  orientation: LocationOrientation;
}