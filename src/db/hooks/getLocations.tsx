import { useCallback, useEffect, useState } from 'react';
import { getLocations } from '../Locations';
import { definitions } from '../supabase';

type LocationsResult = Array<definitions['Locations']>;

export const useLocations = () => {
  const [locations, setLocations] = useState<LocationsResult>([]);

  const refreshLocations = useCallback(async () => {
    const results = await getLocations();
    if (results == null) {
      return;
    }
    setLocations(results);
  }, [getLocations, setLocations]);

  useEffect(() => {
    refreshLocations();
  }, []);

  return { locations, refreshLocations };
};