'use strict';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

module.exports = (injectedArgs) => {

  const {
    reducers
  } = injectedArgs;

  const finalCreateStore = applyMiddleware(
    thunk,
    createLogger()
  )(createStore);

  const store = finalCreateStore(reducers);

  return store;
};
