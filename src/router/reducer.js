'use strict';

module.exports = ({actionTypes}) => {

  const {
    CHANGE_ROUTE,
  } = actionTypes;

  const initialState = {
    route:{name:'login'}
  };

  const reducer = (state,action) => {
    state = state || initialState;
    switch (action.type) {
      case CHANGE_ROUTE:
        return {
          route:action.newRoute,
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
