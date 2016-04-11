'use strict';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import reducer from './route_reducer.js';

module.exports = function () {

  const finalCreateStore = applyMiddleware(
    thunk,
    createLogger()
  )(createStore);

  const store = finalCreateStore(reducer);

  return store;
};
