import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  AuthProvider,
  ModalProvider,
  ThemeProvider,
  ItemsProvider,
} from 'hooks';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <AuthProvider>
          <ItemsProvider>
            <App />
          </ItemsProvider>
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
