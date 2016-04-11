'use strict';

import { combineReducers } from 'redux';
import router from './routing/reducer.js';
import registration from './registration/reducer.js';
import create_event from './create_event/reducer.js';
import store from './store.js';
import login from './login/reducer.js';

const rootReducer = combineReducers({
  router,
  registration,
  create_event,
  store,
  login
});

export default rootReducer;
