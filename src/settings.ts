/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const settings = {
  supabase: {
    uri: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_URI!,
    apiKey: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_API_KEY!,
  },
  googleMaps: {
    apiKey: process.env.REACT_APP_MAGIC_BOOST_GOOGLE_MAPS_API!,
    defaultCenter: {
      lat: 59.95, 
      lng: 30.33
    }
  }
};

