'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import R from 'ramda';
import Router from './router/container.js';
import './styles/app.scss';

const internalModules = {
  router:require('./router/index.js')(),
  login:require('./login/index.js')(),
  register:require('./register/index')(),
  event_view:require('./event_view/index.js')(),
  event_create:require('./event_create/index')(),
  store:require('./store/index')()
};

const actions = R.map((module) => module.actions, internalModules);

const reducers = combineReducers({
  ...R.map((module) => module.reducer, internalModules)
});

const store = require('./configure_store.js')({
  actions:actions,
  reducers:reducers,
});

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('main')
);
