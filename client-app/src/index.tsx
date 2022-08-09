import { StrictMode } from 'react';
import { render } from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';

const rootElement = document.getElementById('root');
render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
