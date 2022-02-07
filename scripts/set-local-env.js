require('dotenv').config();
const { getActiveEnv, setActiveEnv, exec } = require('./execWrapper');

const environment = process.argv[2];
if (!(['dev', 'staging', 'production']).includes(environment)) {
  throw Error('Invalid environment')
}

// update buildConfig.js
setActiveEnv(environment);

// update supabase config
const dotEnvConfigPath = ['production', 'staging'].includes(environment)
  ? `.env.${environment}`
  : '.env';

dotEnvConfig = require('dotenv').config({ path: dotEnvConfigPath }).parsed;
exec(`supabase db remote set ${dotEnvConfig.MAGIC_BOOST_CONNECTION_STRING}`)

