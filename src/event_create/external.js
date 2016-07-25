'use strict';

module.exports = {
  actions: {
    router:require('../router/index.js')().actions,
    store:require('../store/index.js')().actions
  },
  actionTypes:require('../action_types.js')
  , Navbar:require('../_lib/navbar.js')
  , config:require('../config.js')
  , EventItem:require('../event_view/index')().event_item
  , styles:require('../styles.js')
};
