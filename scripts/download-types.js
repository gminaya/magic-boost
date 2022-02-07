/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getActiveEnv, exec } = require('./execWrapper');
const environment = getActiveEnv();
const dotEnvConfigPath = ['production', 'staging'].includes(environment)
  ? `.env.${environment}`
  : '.env';

const dotEnvConfig = require('dotenv').config({
  path: dotEnvConfigPath
}).parsed;

console.log(`Download types for ${environment} environment`);

const config = {
  uri: dotEnvConfig.REACT_APP_MAGIC_BOOST_SUPABASE_URI,
  apiKey: dotEnvConfig.REACT_APP_MAGIC_BOOST_SUPABASE_API_KEY
};

exec(`npx openapi-typescript ${config.uri}/rest/v1/?apikey=${config.apiKey} --output types/../src/db/SupabaseTypes.ts`);