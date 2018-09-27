/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './app.global.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/reducers';

let composeEnhancers = null || compose;
if (process.env.NODE_ENV === 'development') {
  //  developers live reload
  registerServiceWorker();
  //  setting up redux dev tools if if it is available on the developer machine
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
