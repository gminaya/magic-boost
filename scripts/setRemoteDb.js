/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

console.log(process.env.NODE_ENV);
const environment = ['production', 'staging'].includes(process.env.NODE_ENV)
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

require('dotenv').config({ path: environment });
const { exec } = require('./execWrapper');

const connString = process.env.MAGIC_BOOST_CONNECTION_STRING;
exec(`supabase db remote set ${connString}`)

