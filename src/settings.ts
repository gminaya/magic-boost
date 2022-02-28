/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const settings = {
  sentry:{
    dsn: process.env.REACT_APP_MAGIC_BOOST_DSN!
  },
  googleMaps:{
    apiKey: process.env.REACT_APP_MAGIC_BOOST_GOOGLE_MAPS_KEY!,
    defaulZoom: 16
  },
  supabase: {
    uri: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_URI!,
    apiKey: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_API_KEY!,
  },
};
