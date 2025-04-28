import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

async function enableMocking() {
  // eslint-disable-next-line
  // @ts-ignore
  const { worker } = await import('./mocks/browser');

  // eslint-disable-next-line
  // @ts-ignore
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <CssBaseline />
      <App />
    </StrictMode>
  );
});
