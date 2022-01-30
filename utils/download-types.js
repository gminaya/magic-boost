/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

//TODO: Amhed: Need to update script to put directly unto /db/supabase
//TODO: Amhed: Change that name from supabase.ts to supabase-types.ts
//TODO: Amhed: Create scripts to push to staging/prod

require('dotenv').config();
const { exec } = require('child_process');

const config = {
  uri: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_URI,
  apiKey: process.env.REACT_APP_MAGIC_BOOST_SUPABASE_API_KEY
};

const generateCommand = `npx openapi-typescript ${config.uri}/rest/v1/?apikey=${config.apiKey} --output types/supabase.ts`;

exec(generateCommand, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});