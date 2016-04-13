'use strict';

import * as types from '../action_types.js';
import * as NavigationActions from '../routing/actions.js';

export const changeInput = (field, value, valid) => {
  return ({type:types.CHANGE_REGISTRATION_FIELD,field,value})
};
const updateStore = (field, value) => {
  return ({type:types.UPDATE_STORE,field,value})
};

const changeValidationState = (field, validated) => {
  return ({type:types.VALIDATE_REGISTRATION_FIELD,field,validated});
};

export const register = () => (dispatch, getState) => {

  const {registration} = getState();

  const {name, email, password, jobtitle, employer} = registration;

  const allInputsValidated = [
    'name',
    'email',
    'password'
  ].every(field => registration[field].validated);

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
      url:'http://localhost:3003/register',
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
        window.alert('hit registration endpoint and returned success');
        dispatch(updateStore('user', json.user));
        dispatch(updateStore('logged_in', true));
      } else {
        throw new Error('Login');
      }
    }).then(data => {
      dispatch(NavigationActions.navigateTo({name:'view_event'}));
    }).catch(error => {
      window.alert('something went wrong in login');
    });
  }
}

export const validateInput = (name, value) => (dispatch, getState) => {
  const valid = validationSchema[name](value);
  dispatch(changeValidationState(name, valid));
}

const validationSchema = {
  'name': (value) => {
    return /\w+( +\w+)*$/.test(value);
  },
  'email': (value) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    .test(value);
  },
  'password': (value) => {
    return /^(?=.*[0-9])(?=.{3,}[a-zA-Z])([\S]+)$/.test(value)
  }
}
