'use strict';

const {validationSchema} = require('./utils.js')

module.exports = ({
    actions
  , actionTypes
  , config
}) => {

  const {
    router,
    store
  } = actions;

  const {serverRoot} = config;
  const internals = {};

  internals.changeInput = (field, value, valid) => {
    return ({type:actionTypes.CHANGE_REGISTRATION_FIELD,field,value})
  };

  internals.updateStore = (field, value) => {
    return ({type:actionTypes.UPDATE_STORE,field,value})
  };

  internals.changeValidationState = (field, validated) => {
    return ({type:actionTypes.VALIDATE_REGISTRATION_FIELD,field,validated});
  };

  internals.submitRegister = () => (dispatch, getState) => {

    const {register} = getState();

    const {name, email, password, jobtitle, employer} = register;

    const allInputsValidated = [
      'name',
      'email',
      'password'
    ].every(field => register[field].validated);

    const user = {
      'name':name.value,
      'email':email.value,
      'password':password.value,
      'jobtitle':jobtitle.value,
      'employer':employer.value
    };

    if(!allInputsValidated) {
      window.alert('Please correctly fill in name, email and password fields');
    } else {
      const req = {
        url:`${serverRoot}/register`,
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(user)
      };

      fetch(req.url, req)
      .then(function(response) {
        return response.json();
      }).then(json => {
        if (json.status === 'success') {
          dispatch(store.update('user', json.user));
          dispatch(store.update('logged_in', true));
          dispatch(router.navigateTo({name:'event_view'}));
        } else {
          throw new Error('Login');
        }
      }).catch(error => {
        window.alert('something went wrong in login');
      });
    }
  }

  internals.validateInput = (name, value) => (dispatch, getState) => {
    const valid = validationSchema[name](value);
    dispatch(internals.changeValidationState(name, valid));
  }

  return internals;
};
