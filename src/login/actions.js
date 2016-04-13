'use strict';

const fetch = require('node-fetch');

import * as types from '../action_types.js';
import * as StoreActions from '../store/actions.js';
import * as NavigationActions from '../routing/actions.js';

export const changeInput = (field, value) => {
  return ({type:types.CHANGE_LOGIN_FIELD,field,value});
};

export const logout = () => (dispatch) => {
  dispatch(StoreActions.clearStore());
  dispatch(NavigationActions.navigateTo({name:'login'}));
};

export const login = () => (dispatch, getState) => {

  const {email, password} = getState().login;

  if(email === undefined || password === undefined) {
    window.alert('Please check your inputs and try again');
  } else {
    const req = {
      url:`http://localhost:3003/login`,
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
        dispatch(StoreActions.updateStore('logged_in',true));
        dispatch(StoreActions.updateStore('user', json.user));
        dispatch(NavigationActions.navigateTo({name:'view_event'}));
      } else {
        throw new Error('Login');
      }
    }).catch(() => {
      window.alert('something went wrong in login');
    });

    return;
  }
};
