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
    , event_item:require('./components/event_item.js')
  };
};
