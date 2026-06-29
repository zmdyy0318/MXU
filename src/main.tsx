import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import App from './App';
import './i18n';
import './index.css';
import { setUiScale } from '@/utils/windowUtils';

setUiScale(window.devicePixelRatio || 1);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TooltipProvider delayDuration={300}>
      <App />
    </TooltipProvider>
  </React.StrictMode>,
);
