'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';

const ViewerActions = require('../index.js')().actions;
const {actions, Navbar, BetCard} = require('../external.js');
const Event = require('./event_item.js');

const mapDispatchToProps = {
  ...ViewerActions,
  ...actions.router
};

class EventView extends Component {

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    console.log(this.props);
    const events = this.props.store.events.map((event,index) => {
      return (
        <Event {...event}/>
      );
    });

    return (
      <div>
        <Navbar header={'EVENTS'} {...this.props} link='event_create' linkName='Create Event'/>
        <div className={'viewEvents'}>
          { events }
        </div>
      </div>
   );
  }
}

const mapStateToProps = state => ({...state});

module.exports = connect(mapStateToProps,mapDispatchToProps)(EventView);
