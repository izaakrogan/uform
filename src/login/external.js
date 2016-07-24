'use strict';

module.exports = {
  actions:{
    router:require('../router/index.js')().actions,
    store:require('../store/index')().actions
  }
  , actionTypes:require('../action_types.js')
  , config:require('../config.js')
};
