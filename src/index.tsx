import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { settings } from 'settings';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'dotenv/config';

const currentEnvironment = process.env.NODE_ENV;

Sentry.init({
  dsn: settings.sentry.dsn,
  integrations: [new BrowserTracing()],
  environment: currentEnvironment,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
