'use strict';

import {
  CHANGE_REGISTRATION_FIELD,
  VALIDATE_REGISTRATION_FIELD
} from '../action_types.js';

export const initialState = {
  name: {value:undefined, validated:undefined},
  email: {value:undefined, validated:undefined},
  bio: {value:undefined, validated:undefined},
  password: {value:undefined, validated:undefined},
  jobTitle: {value:undefined},
  employer: {value:undefined}
};

export default function reducer (state = initialState, action) {

  const {
    field,
    value,
    validated
  } = action;

  switch (action.type) {
    case CHANGE_REGISTRATION_FIELD:
      return {
        ...state,
        [field]: { ...state[field], value }
      };
    case VALIDATE_REGISTRATION_FIELD:
      return {
        ...state,
        [field]: { ...state[field], validated }
      }
    default:
      return state
  }
}
