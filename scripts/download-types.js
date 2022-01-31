/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();
const { exec } = require('./execWrapper');

const config = {
  uri: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_URI,
  apiKey: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_API_KEY
};

exec(`npx openapi-typescript ${config.uri}/rest/v1/?apikey=${config.apiKey} --output types/../src/db/SupabaseTypes.ts`);