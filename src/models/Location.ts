import { definitions } from 'db/SupabaseTypes';
import { LocationFormat } from './LocationFormat';
import { LocationOrientation } from './LocationOrientation';

type SupabaseDefinitions = definitions['Locations'];

export interface Location extends SupabaseDefinitions {
  format: LocationFormat;
  orientation: LocationOrientation;
}