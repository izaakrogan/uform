'use strict';
import R from 'ramda';
import {List} from 'immutable';

module.exports = ({
  actionTypes,
  config
}) => {

  const {serverRoot} =config

  const internals = {};

  internals.updateEventsList = (events) => ({
    type:actionTypes.UPDATE_EVENTS_LIST,events
  })

  internals.getEvents = () => (dispatch) => {
    const req = {
      url:`${serverRoot}/event`,
      method:'GET'
    }
    fetch(req.url, req)
    .then(response => {
      return response.json()
    }).then(json => {
      if(json.status === 'success') {
        dispatch(internals.updateEventsList(List.of(...json.events)));
      }
    })
  }


  return internals;
}
