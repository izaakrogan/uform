'use strict';

var fetch = require('node-fetch');

import * as types from '../action_types.js';
import * as StoreActions from '../store/actions.js';
import * as NavigationActions from '../routing/actions.js';

export const changeInput = (field, value) => {
  return ({type:types.CHANGE_LOGIN_FIELD,field,value})
};

export const login = () => (dispatch, getState) => {

  const {email, password} = getState().login;

  if(email === undefined || password === undefined) {
    window.alert('Please check your inputs and try again')
  } else {
    const req = {
      url:`http://localhost:3003/login`,
      method:'GET',
      headers:{
        'Content-type':'application/json'
      },
    };

    fetch(req.url, req)
    .then(function(response) {
      return response.json();
    }).then(json => {
      if (json.status === 'success') {
        dispatch(StoreActions.updateStore('logged_in',true));
      } else {
        throw new Error('Login');
      }
    }).then(data => {
      dispatch(StoreActions.updateStore('email', email));
      dispatch(StoreActions.updateStore('password', password));
      dispatch(NavigationActions.navigateTo({name:'view_event'}));
    }).catch(error => {
      window.alert('something went wrong in login');
    });

    return;
  }
};
