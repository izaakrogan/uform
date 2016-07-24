'use strict';
import R from 'ramda';

module.exports = ({
  actionTypes,
  config,
  actions
}) => {

  const {store,router} = actions
  const {serverRoot} =config

  const internals = {};

  internals.updateLiveBetList = (bets) => ({
    type:actionTypes.UPDATE_LIVE_BETS,bets
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
        dispatch(store.update('events', json.events));
      }
    })
  }


  return internals;
}
