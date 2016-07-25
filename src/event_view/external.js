'use strict';

module.exports = {
  actions: {
    router:require('../router/index.js')().actions,
    event_create:require('../event_create/index.js')().actions
  },
  actionTypes:require('../action_types.js')
  , Navbar:require('../_lib/navbar.js')
  , config:require('../config.js')
  , Event:require('../event_create/index.js')().event_item
};
