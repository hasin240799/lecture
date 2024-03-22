import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '../AppRouter'; // or your main component

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);