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
          dispatch(store.update('events', json.events));
          dispatch(internals.clear());
          dispatch(router.navigateTo({name:'event_view'}));
        }
      });
    } else {
      window.alert('Please check you registration fields');
    }
  };

  internals.getAddress = () => (dispatch, getState) => {

    const {
      location,
    } = getState().create_event;

    const req = {
        url:`${serverRoot}/getAddress?postcode=${location}`,
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

  internals.validateInput = (name, value) => (dispatch, getState) => {
    const valid = validationSchema['oneLetter'](value);
    dispatch(internals.changeValidationState(name, valid));
  }

  return internals;
}
