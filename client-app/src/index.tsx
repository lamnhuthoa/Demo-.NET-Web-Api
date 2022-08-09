import { StrictMode } from 'react';
import { render } from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import { store, StoreContext } from './app/stores/store';

const rootElement = document.getElementById('root');
render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  rootElement
);
