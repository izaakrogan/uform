'use strict';

module.exports = ({actionTypes}) => {

  const {
    CHANGE_REGISTRATION_FIELD,
    VALIDATE_REGISTRATION_FIELD
  } = actionTypes;

  const initialState = {
    name: {value:undefined, validated:undefined},
    email: {value:undefined, validated:undefined},
    password: {value:undefined, validated:undefined},
    jobtitle: {value:undefined},
    employer: {value:undefined}
  };

  const reducer = (state,action) => {
    state = state || initialState;
    const {field,value,validated} = action;
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
        return {
          ...state
        };
    }
  }

  reducer._initialState = initialState;

  return reducer;
};
