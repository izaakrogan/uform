'use strict';

import R from 'ramda';
const {validationSchema} = require('./utils.js')

module.exports = ({
  actionTypes,
  actions,
  config
}) => {

  const {router,store} = actions
  const {serverRoot} = config;

  const internals = {};

  internals.changeInput = (field, value) => {
    return ({type:actionTypes.CHANGE_EVENT_FIELD,field,value})
  };

  internals.changeOptionalInput = (field, value) => {
    return ({type:actionTypes.CHANGE_OPTIONAL_EVENT_FIELD,field,value})
  };

  internals.changeValidationState = (field, validated) => {
    return ({type:actionTypes.VALIDATE_EVENT_FIELD,field,validated});
  };

  internals.clear = () => {
    return ({type:actionTypes.CLEAR_EVENT_CREATE});
  }

  internals.updateEventsList = (events) => ({
    type:actionTypes.UPDATE_EVENTS_LIST,events
  })

  internals.saveEvent = () => (dispatch, getState) => {

    const { event_create } = getState();
    const {
      name,
      type,
      host,
      start_time,
      end_time,
      guest_list,
      location,
      additional_info
    } = event_create;
    const allInputsValidated = [
      'name',
      'type',
      'host',
      'start_time',
      'end_time',
      'guest_list',
      'location'
    ].every(field => event_create[field].validated);
    const event = {
      'name':name.value,
      'type':type.value,
      'host':host.value,
      'start_time':start_time.value,
      'end_time':end_time.value,
      'guest_list':guest_list.value,
      'location':location.value,
      'additional_info':additional_info,
    };

    if(allInputsValidated) {
      const req = {
        url:`${serverRoot}/event`,
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(event)
      };

      fetch(req.url, req).then((res) => {
        return res.json();
      }).then(json => {
        if(json.status === 'success') {
          dispatch(internals.updateEventsList(List.of(...json.events)));
          dispatch(internals.clear());
          dispatch(router.navigateTo({name:'event_view'}));
        }
      });
    } else {
      window.alert('Please check you registration fields');
    }
  };

  internals.validateInput = (name, value) => (dispatch, getState) => {
    let valid;
    if(name === 'start_time' || name === 'end_time') {
      valid = validationSchema[name](value, getState().event_create.start_time.value);
    } else {
      valid = validationSchema['oneLetter'](value);
    }
    dispatch(internals.changeValidationState(name, valid));
  }

  return internals;
}
