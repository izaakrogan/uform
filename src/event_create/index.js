'use strict';

module.exports = (injectExternal) => {

  const services = Object.assign(
    require('./external.js'),
    injectExternal
  );

  return {
    actions:require('./actions.js')(services)
    , reducer:require('./reducer.js')(services)
    , event_create:require('./components/index.js')
  };
};
