import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, history } from './redux/store'
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import NotifierProvider from './components/Notifier/NotifierProvider';
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider>
          <NotifierProvider>
            <App />
          </NotifierProvider>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
