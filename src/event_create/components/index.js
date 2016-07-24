'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from '../../styles.js';
const EventActions = require('../index.js')().actions
const {EventItem,actions,Navbar} = require('../external.js');

const mapDispatchToProps = {
  ...EventActions,
  ...actions.router
};

class Event extends Component {

  render() {
    return (
      <div style={styles.container}>
        <Navbar header={'Create Event'} link={'event_view'} linkName={'View Events'} {...this.props}/>
        <div className={'eventContainer'}>
          <div className={'eventForm'}>

            <label for='name' type='text'>
              <span style={{display:'none'}}>Name of event</span>
              <input
                ref="autoFocusInput"
                id='name'
                type="text"
                placeholder='Name of event'
                required
                value={this.props.event_create.name}
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
                placeholder='Type of event'
                required
                value={this.props.event_create.type}
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
                placeholder='Event host'
                required
                value={this.props.event_create.host}
                onChange={(e) => {
                  return this.props.changeInput('host', e.target.value)
                }}
              />
            </label>

            <label for='startTime' style={{margin:'auto'}}>Event start date and time</label>
            <input
              id='startTime'
              type="datetime-local"
              placeholder='Event start date and time'
              required
              value={this.props.event_create.start_time}
              onChange={(e) => {
                return this.props.changeInput('start_time', e.target.value)
              }}
            />

            <label for='endTime' style={{margin:'auto'}}>Event end date and time</label>
            <input
              id='endTime'
              type="datetime-local"
              placeholder='Event end date and time'
              required
              value={this.props.event_create.end_time}
              onChange={(e) => {
                return this.props.changeInput('end_time', e.target.value)
              }}
            />

            <label for='guestList' type='text'>
              <span style={{display:'none'}}>Guest list</span>
              <input
                id='guestList'
                type="text"
                placeholder='Guest list'
                value={this.props.event_create.guest_list}
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
                placeholder='Location'
                required
                value={this.props.event_create.location}
                onChange={(e) => {
                  return this.props.changeInput('location', e.target.value)
                }}
              />
            </label>

            <label for='guestList' type='text'>
              <span style={{display:'none'}}>Guest list</span>
              <textarea
                type="text"
                placeholder='Additional information'
                value={this.props.event_create.additional_info}
                onChange={(e) => {
                  return this.props.changeInput('additional_info', e.target.value)
                }}
              />
            </label>

            <button onClick={() => this.props.saveEvent()}>Create event</button>
          </div>
          <EventItem
            name={this.props.event_create.name}
            type={this.props.event_create.type}
            host={this.props.event_create.host}
            start_time={this.props.event_create.start_time}
            end_time={this.props.event_create.end_time}
            guest_list={this.props.event_create.guest_list}
            location={this.props.event_create.location}
            additional_info={this.props.event_create.additional_info}
          />
      </div>
    </div>
   );
  }
}

const mapStateToProps = state => ({...state});

module.exports = connect(mapStateToProps,mapDispatchToProps)(Event);
