'use strict';

import * as types from '../action_types.js';

export const updateStore = (field, value) => {
  return ({type:types.UPDATE_STORE,field,value})
};
