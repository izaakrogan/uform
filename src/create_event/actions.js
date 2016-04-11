'use strict';

import * as types from '../action_types.js';
import * as NavigationActions from '../routing/actions.js';
import R from 'ramda';

export const changeInput = (field, value) => {
  return ({type:types.CHANGE_EVENT_FIELD,field,value})
};

const updateStore = (field, value) => {
  return ({type:types.UPDATE_STORE,field,value})
};

const addEvent = (event) => {
  return ({type:types.ADD_EVENT, event})
}

export const saveEvent = () => (dispatch, getState) => {

  const {
    name,
    type,
    host,
    start_time,
    end_time,
    guest_list,
    location,
    additional_info
  } = getState().create_event;

  const {events} = getState().store

  const event = {
    name,
    type,
    host,
    start_time,
    end_time,
    guest_list,
    location,
    additional_info
  }

  if(Object.keys(event).every(ev => {
    console.log(ev)
    return event[ev] !== undefined || ev === additional_info
  })) {
    const req = {
      url:'http://localhost:3003/createEvent',
      method:'POST',
      body:JSON.stringify(event)
    };

    fetch(req.url, req).then((res) => {
      return res.json()
    }).then(json => {
      console.log(json)
      if(json.status === 'success') {
        let newEvents = events.concat(event)
        console.log('newEvents', newEvents)
        dispatch(addEvent(newEvents));
        dispatch(NavigationActions.navigateTo({name:'view_event'}))
      }
    })
  } else {
    window.alert('Please check you registration fields')
  }
};

export const getAddress = () => (dispatch, getState) => {

  const {
    location,
  } = getState().create_event;

  const req = {
      url:`http://localhost:3003?postcode=${location}`,
      method:'GET',
      headers:{
        'Content-type':'application/json',
      }
    };

  fetch(req.url,req).then(response => {
    return response.json();
  }).then(json => {
    if (json.status === 'success') {
      const addressOptions = json.addresses.map(addressInfo => {
        const address = addressInfo.split(',');
        return {
          line1:address[0]
          , line2:address[1]
          , line3:address[2]
          , line4:address[3]
          , locality:'GB'
          , city:address[5].replace(/^\s/,'')
          , county:address[6]
        };
      });
      dispatch(internals.setAddressOptions(addressOptions));
      dispatch(internals.updateInput('line1',addressOptions[0].line1));
      dispatch(internals.updateInput(
        'line2',addressOptions[0].line2.replace(/^\s/,'')
      ));
      dispatch(internals.updateInput('place',addressOptions[0].city));
      dispatch(internals.updateInput('countryCode','UNITED KINGDOM'));
    } else if (json.message.response.body.Message === 'Not Found') {
      window.alert('Not Found')
    } else if (json.message.response.body.Message === 'Bad Request') {
      window.alert('The postcode you entered is not valid');
    } else {
      window.alert('Error');
    }
  }).catch(() => {
    window.alert('Error')
  })
};
