'use strict';

module.exports = ({
  actionTypes
}) => {

  const internals = {};

  internals.changeRoute = (newRoute) => {
    return ({type:actionTypes.CHANGE_ROUTE,newRoute});
  };

  internals.navigateTo = (nextRoute) => (dispatch,getState) => {
    if(nextRoute.name !== getState().router.route.name) {
      dispatch(internals.changeRoute(nextRoute));
    }
  };

  return internals;
};
