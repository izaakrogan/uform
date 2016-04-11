'use strict';

import {
  CHANGE_EVENT_FIELD,
} from '../action_types.js';

export const initialState = {
  name: undefined,
  type: undefined,
  host: undefined,
  start_time:undefined,
  end_time: undefined,
  guest_list:undefined,
  location:undefined,
  additional_info:undefined
};

export default function reducer (state = initialState, action) {

  const {
    field,
    value,
  } = action;

  switch (action.type) {
    case CHANGE_EVENT_FIELD:
      return {
        ...state,
        [field]: value
      };
    default:
      return state
  }
}
