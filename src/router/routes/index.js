'use strict';

module.exports = {
  'login':{
    component:require('../../login/index')().login,
    auth: false,
  },
  'register':{
    component:require('../../register/index')().register,
    auth: false,
  },
  'event_view':{
    component:require('../../event_view/index.js')().event_view,
    auth: false,
  },
  'event_create':{
    component:require('../../event_create/index')().event_create,
    auth: false
  }
};
