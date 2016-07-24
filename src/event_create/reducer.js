'use strict';

module.exports = ({actionTypes}) => {

  const {
    CHANGE_EVENT_FIELD,
  } = actionTypes;

  const initialState = {
    name:undefined,
    type:undefined,
    host:undefined,
    start_time:undefined,
    end_time:undefined,
    guest_list:undefined,
    location:undefined,
    additional_info:undefined
  };

  const reducer = (state,action) => {
    state = state || initialState;
    const {field,value} = action;
    switch (action.type) {
      case CHANGE_EVENT_FIELD:
        return {
          ...state,
          [field]: value
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
