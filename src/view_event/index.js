'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import EventItem from '../create_event/components/event_item.js';
import styles from '../styles.js';
const mapDispatchToProps = {

}

class ViewEvent extends Component {

  render() {

    var events = [
      {
        name:'test1',
        type:'test1',
        host:'test1',
        start_time:'test1',
        end_time:'test1',
        guest_list:'test1',
        location:'test1',
        additional_info:'test1',
      },
      {
        name:'test2',
        type:'test2',
        host:'test2',
        start_time:'test2',
        end_time:'test2',
        guest_list:'test2',
        location:'test2',
        additional_info:'test2',
      },
    ]

    return (
      <div style={container}>
        <h2 style={styles.header}>View Events</h2>
        {this.props.store.events.map(event => {
          return <EventItem  {...event}/>
        })}

      </div>
   );
  }
}

var container = {
  backgroundColor: '#ccc',
  display:'flex',
  flexDirection:'column'
};

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps,mapDispatchToProps)(ViewEvent);
