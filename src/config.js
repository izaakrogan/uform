'use strict';
module.exports = {
  appName:'uform',
  serverRoot:'https://uform-api.herokuapp.com'
};

// https://uform-api.herokuapp.com

// serverRoot: global.window === undefined /* if node env, stay in localhost */
// ? 'http://localhost:3003'
// : __DEV__ === true
// ? 'http://localhost:3003'
// : 'http://localhost:3003'
