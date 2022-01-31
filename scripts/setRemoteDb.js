/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();
const { exec } = require('./execWrapper');

const connString = process.env.MAGIC_BOOST_CONNECTION_STRING;
exec(`supabase db remote set ${connString}`)

