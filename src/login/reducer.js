'use strict';

module.exports = ({actionTypes}) => {

  const {
    UPDATE_LOGIN_FIELD
  } = actionTypes;

  const initialState = {
    email:undefined,
    password:undefined
  };

  const reducer = (state,action) => {
    state = state || initialState;
    switch (action.type) {
      case UPDATE_LOGIN_FIELD:
        return {
          ...state,
          [action.field]:action.value
        };
      default:
        return {
          ...state
        };
    }
  };

  reducer._initialState = initialState;

  return reducer;
};
