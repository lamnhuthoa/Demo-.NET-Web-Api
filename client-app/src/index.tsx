import { render } from 'react-dom';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,
  rootElement
);
