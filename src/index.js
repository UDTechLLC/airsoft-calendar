/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import './app.global.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
