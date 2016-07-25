'use strict';

module.exports = ({actionTypes}) => {

  const {
    CHANGE_EVENT_FIELD,
    CHANGE_OPTIONAL_EVENT_FIELD,
    VALIDATE_EVENT_FIELD,
    CLEAR_EVENT_CREATE
  } = actionTypes;

  const initialState = {
    name:{value:undefined, validated:undefined},
    type:{value:undefined, validated:undefined},
    host:{value:undefined, validated:undefined},
    start_time:{value:undefined, validated:undefined},
    end_time:{value:undefined, validated:undefined},
    guest_list:{value:undefined, validated:undefined},
    location:{value:undefined, validated:undefined},
    additional_info:undefined,
  };

  const reducer = (state,action) => {
    state = state || initialState;
    const {field,value,validated} = action;
    switch (action.type) {
      case CHANGE_EVENT_FIELD:
        return {
          ...state,
          [field]: { ...state[field], value }
        };
      case CHANGE_OPTIONAL_EVENT_FIELD:
        return {
          ...state,
          [field]: value
        };
      case VALIDATE_EVENT_FIELD:
        return {
          ...state,
          [field]: { ...state[field], validated }
        }
      case CLEAR_EVENT_CREATE:
        return {
          ...initialState
        }
      default:
        return {
          ...state
        };
    }
  };

  reducer._initialState = initialState;

  return reducer;
};
