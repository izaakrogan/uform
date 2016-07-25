'use strict';

module.exports = ({actionTypes}) => {

  const { List } = require('immutable');

  const {
    UPDATE_EVENTS_LIST
  } = actionTypes;

  const initialState = {
    events:List.of(),
  };

  const reducer = (state,action) => {
    state = state || initialState;
    switch (action.type) {
      case UPDATE_EVENTS_LIST:
      return {
        ...state,
        events:action.events
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
