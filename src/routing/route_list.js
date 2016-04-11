'use strict';

function createRouteList (components) {
  return  ({
    'login': {
      component: components.login,
      auth: false,
    },
    'registration': {
      component: components.registration,
      auth: false,
    },
    'create_event': {
      component: components.create_event,
      auth: true,
    },
    'view_event': {
      component: components.view_event,
      auth: true,
    }
  })
}

export default createRouteList;
