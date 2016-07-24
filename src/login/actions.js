'use strict';

module.exports = ({
    actions
  , actionTypes
  , config
}) => {

  const { serverRoot } = config;
  const {
    router,
    store
  } = actions;

  const internals = {};

  internals.updateLoginField = (field,value) => ({
    type:actionTypes.UPDATE_LOGIN_FIELD,field,value
  });

  internals.submitLogin = () => (dispatch, getState) => {
    const {email, password} = getState().login;
    if(email === undefined || password === undefined) {
      window.alert('Please check your inputs and try again');
    } else {
      const req = {
        url:`${serverRoot}/login`,
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({email,password})
      };
      fetch(req.url, req)
      .then(function(response) {
        return response.json();
      }).then(json => {
        if (json.status === 'success') {
          dispatch(store.update('user', json.user));
          dispatch(store.update('logged_in',true));
          dispatch(router.navigateTo({name:'event_view'}));
        } else {
          throw new Error('Login');
        }
      }).catch(() => {
        window.alert('something went wrong in login');
      });

      return;
    }
  };

  return internals;
};
