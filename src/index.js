import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Constructor from './app/app';
import { AuthProvider } from './app/components/auth/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <Constructor/>
  </AuthProvider>
);