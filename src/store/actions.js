'use strict';

module.exports = ({
  actionTypes
}) => {

  const internals = {};

  internals.update = (field, value) => {
    return ({type:actionTypes.UPDATE_STORE,field,value})
  };

  internals.clearStore = () => ({type:actionTypes.CLEAR_STORE});

  return internals;
}
