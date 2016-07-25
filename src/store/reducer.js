'use strict';

module.exports = ({actionTypes}) => {
  const {
    UPDATE_STORE,
    UPDATE_EVENTS,
    CLEAR_STORE
  } = actionTypes;

  const initialState = {
    logged_in:false,
    user:undefined
  };

  const reducer = (state,action) => {
    state = state || initialState;
    const {field,value} = action;
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
  reducer._initialState = initialState;
  return reducer;
}
