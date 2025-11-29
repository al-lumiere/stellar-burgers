import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { AppHeader } from '@components';
import { BrowserRouter } from 'react-router-dom';
import store from '../src/services/store';
import styles from '../src/components/app/app.module.css';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <div className={styles.app}>
      <Provider store={store}>
        <BrowserRouter>
          <AppHeader />
          <App />
        </BrowserRouter>
      </Provider>
    </div>
  </React.StrictMode>
);
