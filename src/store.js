'use strict';

import {
  UPDATE_STORE,
  UPDATE_EVENTS,
  CLEAR_STORE
} from './action_types.js';

export const initialState = {
  logged_in:false,
  user:undefined,
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
    case UPDATE_EVENTS:
      return {
        ...state,
        events:action.event
      };
    case CLEAR_STORE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
