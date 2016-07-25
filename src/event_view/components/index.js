'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';

const ViewerActions = require('../index.js')().actions;
const { actions, Navbar, BetCard, Event } = require('../external.js');


const mapDispatchToProps = {
  ...ViewerActions,
  ...actions.router
};

class EventView extends Component {

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const events = this.props.event_view.events.map((event,index) => {
      return (
        <Event {...event}/>
      );
    }).reverse();

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
