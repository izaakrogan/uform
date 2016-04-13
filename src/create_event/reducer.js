'use strict';

import {
  CHANGE_EVENT_FIELD,
} from '../action_types.js';

export const initialState = {
  name: 'a',
  type: 'a',
  host: 'a',
  start_time:'2016-12-01T23:59',
  end_time: '2016-12-31T23:59',
  guest_list:'a',
  location:'a',
  additional_info:'a'
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
