'use strict';

import {
  CHANGE_LOGIN_FIELD,
} from '../action_types.js';

export const initialState = {
  email: undefined,
  password: undefined,
};

export default function reducer (state = initialState, action) {

  const {
    field,
    value,
  } = action;

  switch (action.type) {
    case CHANGE_LOGIN_FIELD:
      return {
        ...state,
        [field]: value
      };
    default:
      return state
  }
}
