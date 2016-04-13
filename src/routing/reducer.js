'use strict';

import {
  CHANGE_ROUTE,
  GO_BACK,
} from '../action_types.js';

const initialRoute = {name:'login'};

export const initialState = {
  route: initialRoute,
  history: [initialRoute]
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      const { route, history } = state;
      if (action.newRoute.name !== route.name) {
        return {
          route: action.newRoute,
          history: [...history, action.newRoute]
        };
      } else {
        return {
          ...state
        };
      }
    break;
    case GO_BACK:
      let newRoute = state.history.length > 3 ? state.history[state.history.length - 2] : state.history[2];
      let newHistory = state.history.length > 3 ? state.history.slice(0, -1) : state.history;
      return {
        ...state,
        route: newRoute,
        history: newHistory,
      };
    break;
    default:
      return {
        ...state
      };
  }
}
