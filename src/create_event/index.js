'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EventItem from './components/event_item.js';
import Navbar from '../features/navbar.js';

import * as EventActions from './actions.js';
import styles from '../styles.js';

const mapDispatchToProps = {
  ...EventActions,
};

class Event extends Component {

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.autoFocusInput).focus();
  }

  render() {
    return (
      <div style={styles.container}>
        <Navbar name={'Create Event'} link={'view_event'} linkName={'View Events'} {...this.props}/>
        <div style={Object.assign({}, styles.container, innerContainer)}>
          <div style={styles.container}>

            <label for='name' type='text'>
              <span style={{display:'none'}}>Name of event</span>
              <input
                ref="autoFocusInput"
                id='name'
                type="text"
                style={styles.input}
                placeholder='Name of event'
                required
                value={this.props.create_event.name}
                onChange={(e) => {
                  return this.props.changeInput('name', e.target.value)
                }}
              />
            </label>

            <label for='type' type='text'>
              <span style={{display:'none'}}>Type of event</span>
              <datalist id="options">
                <select>
                  <option value="drinks" />
                  <option>music</option>
                  <option value="sport">sports lable</option>
                  <option value="theatre" label="theatre label" />
                </select>
              </datalist>
              <input
                id='type'
                list="options"
                type="text"
                style={styles.input}
                placeholder='Type of event'
                required
                value={this.props.create_event.type}
                onChange={(e) => {
                  return this.props.changeInput('type', e.target.value)
                }}
              />
            </label>

            <label for='host' type='text'>
              <span style={{display:'none'}}>event host</span>
              <input
                id='host'
                type='text'
                style={styles.input}
                placeholder='Event host'
                required
                value={this.props.create_event.host}
                onChange={(e) => {
                  return this.props.changeInput('host', e.target.value)
                }}
              />
            </label>

            <label for='startTime' style={{margin:'auto'}}>Event start date and time</label>
            <input
              id='startTime'
              type="datetime-local"
              style={styles.input}
              placeholder='Event start date and time'
              required
              value={this.props.create_event.start_time}
              onChange={(e) => {
                return this.props.changeInput('start_time', e.target.value)
              }}
            />

            <label for='endTime' style={{margin:'auto'}}>Event end date and time</label>
            <input
              id='endTime'
              type="datetime-local"
              style={styles.input}
              placeholder='Event end date and time'
              required
              value={this.props.create_event.end_time}
              onChange={(e) => {
                return this.props.changeInput('end_time', e.target.value)
              }}
            />

            <label for='guestList' type='text'>
              <span style={{display:'none'}}>Guest list</span>
              <input
                id='guestList'
                type="text"
                style={styles.input}
                placeholder='Guest list'
                value={this.props.create_event.guest_list}
                onChange={(e) => {
                  return this.props.changeInput('guest_list', e.target.value)
                }}
              />
            </label>

            <label for='location' type='text'>
              <span style={{display:'none'}}>Guest list</span>
              <input
                id='location'
                type='text'
                style={styles.input}
                placeholder='Location'
                required
                value={this.props.create_event.location}
                onChange={(e) => {
                  return this.props.changeInput('location', e.target.value)
                }}
              />
            </label>

            <label for='guestList' type='text'>
              <span style={{display:'none'}}>Guest list</span>
              <textarea
                type="text"
                style={Object.assign({}, styles.input, {paddingTop:12})}
                placeholder='Additional information'
                value={this.props.create_event.additional_info}
                onChange={(e) => {
                  return this.props.changeInput('additional_info', e.target.value)
                }}
              />
            </label>

            <button onClick={() => this.props.saveEvent()} style={styles.button}>Create event</button>
          </div>
          <EventItem
            name={this.props.create_event.name}
            type={this.props.create_event.type}
            host={this.props.create_event.host}
            start_time={this.props.create_event.start_time}
            end_time={this.props.create_event.end_time}
            guest_list={this.props.create_event.guest_list}
            location={this.props.create_event.location}
            additional_info={this.props.create_event.additional_info}
          />
      </div>
    </div>
   );
  }
}

const innerContainer = {flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap', paddingTop:'50', paddingBottom:'50'}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps,mapDispatchToProps)(Event);
