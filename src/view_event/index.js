'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import EventItem from '../create_event/components/event_item.js';
import Navbar from '../features/navbar.js';

class ViewEvent extends Component {

  render() {
    return (
      <div>
        <Navbar name={'View Events'} link={'create_event'} linkName={'Create Event'} {...this.props}/>
        <div style={eventContainer}>
          {this.props.store.events.map(event => {
            return <EventItem  {...event}/>;
          }).reverse()}
        </div>
      </div>
    );
  }
}

const eventContainer = {
  display:'flex',
  flexDirection:'row',
  flexWrap:'wrap',
  justifyContent:'space-around'
};

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps,{})(ViewEvent);
