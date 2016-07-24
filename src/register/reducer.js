'use strict';

module.exports = ({actionTypes}) => {

  const {
    CHANGE_REGISTRATION_FIELD,
    VALIDATE_REGISTRATION_FIELD
  } = actionTypes;

  const initialState = {
    name: {value:'undefined', validated:true},
    email: {value:'undefined', validated:true},
    password: {value:'undefined', validated:true},
    jobtitle: {value:'undefined'},
    employer: {value:'undefined'}
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
