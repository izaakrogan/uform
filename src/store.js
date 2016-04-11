'use strict';

import {
  UPDATE_STORE,
  ADD_EVENT
} from './action_types.js';

export const initialState = {
  name:undefined,
  email: undefined,
  password: undefined,
  logged_in:false,
  events:[]
};

export default function reducer (state = initialState, action) {

  const {
    field,
    value,
  } = action;

  switch (action.type) {
    case UPDATE_STORE:
      return {
        ...state,
        [field]: value
      };
    case ADD_EVENT:
      return {
        ...state,
        events:action.event
      }
    default:
      return state
  }
}
