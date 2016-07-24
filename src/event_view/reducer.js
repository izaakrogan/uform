'use strict';

module.exports = ({actionTypes}) => {

  const {
    UPDATE_LIVE_BETS
  } = actionTypes;

  const initialState = {
    events:[],
  };

  const reducer = (state,action) => {
    state = state || initialState;
    switch (action.type) {
      case UPDATE_LIVE_BETS:
      return {
        ...state,
        liveBets:action.bets
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
