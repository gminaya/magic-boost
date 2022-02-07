require('dotenv').config();
const { getActiveEnv, setActiveEnv } = require('./execWrapper');

const environment = process.argv[2];
if (!(['dev', 'staging', 'production']).includes(environment)) {
  throw Error('Invalid environment')
}

setActiveEnv(environment);

//scripts/setRemoteDb.js
//node -r dotenv/config scripts/download-types.js dotenv_config_path=.env.staging