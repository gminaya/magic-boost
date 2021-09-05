/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const settings = {
  supabase: {
    uri: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_URI!,
    apiKey: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_API_KEY!,
  },
  googleMaps: {
    apiKey: process.env.REACT_APP_MAGIC_BOOST_GOOGLE_MAPS_API!,
    defaultCenter: {
      lat: 18.4658543, 
      lng: -69.9343296
    },
    defaultZoom: 13
  }
};
