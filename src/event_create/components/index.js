'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const EventActions = require('../index.js')().actions
const EventItem = require('./event_item.js')
const {actions,Navbar,styles} = require('../external.js');

const mapDispatchToProps = {
  ...EventActions,
  ...actions.router
};

class Event extends Component {

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.autoFocusInput).focus();
  }

  render() {

    const nameValid = this.props.event_create.name.validated === false ? {borderColor:'red', display:'block'} : {};
    const typeValid = this.props.event_create.type.validated === false ? {borderColor:'red', display:'block'} : {};
    const hostValid = this.props.event_create.host.validated === false ? {borderColor:'red', display:'block'} : {};
    const start_timeValid = this.props.event_create.start_time.validated === false ? {borderColor:'red', display:'block'} : {};
    const end_timeValid = this.props.event_create.end_time.validated === false ? {borderColor:'red', display:'block'} : {};
    const guest_listValid = this.props.event_create.guest_list.validated === false ? {borderColor:'red', display:'block'} : {};
    const locationValid = this.props.event_create.location.validated === false ? {borderColor:'red', display:'block'} : {};

    return (
      <div style={styles.container}>
        <Navbar header={'Create Event'} link={'event_view'} linkName={'View Events'} {...this.props}/>
        <div className={'eventContainer'}>
          <div className={'eventForm'}>
            <label htmlFor='eventName' type='text'>
              <span style={{display:'none'}}>Name of event</span>
              <input
                ref='autoFocusInput'
                id='eventName'
                style={nameValid}
                type='text'
                placeholder='Name of event*'
                required
                value={this.props.event_create.name.value}
                onChange={(e) => {
                  return this.props.changeInput('name', e.target.value)
                }}
                onBlur={() => {
                  return this.props.validateInput('name', this.props.event_create.name.value)
                }}
              />
            </label>
            <div className={'validationBox'} style={nameValid}>
              <p>Please enter a name</p>
            </div>
            <label htmlFor='eventType' type='text'>
              <span style={{display:'none'}}>Type of event</span>
              <datalist id='options'>
                <select>
                  <option value='drinks' />
                  <option>music</option>
                  <option value='sport'>sports lable</option>
                  <option value='theatre' label='theatre label' />
                </select>
              </datalist>
              <input
                id='eventType'
                list='options'
                type='text'
                style={typeValid}
                placeholder='Type of event*'
                required
                value={this.props.event_create.type.value}
                onChange={(e) => {
                  return this.props.changeInput('type', e.target.value)
                }}
                onBlur={() => {
                  return this.props.validateInput('type', this.props.event_create.type.value)
                }}
              />
            </label>
            <div className={'validationBox'} style={typeValid}>
              <p>Please enter an event type</p>
            </div>
            <label htmlFor='eventHost' type='text'>
              <span style={{display:'none'}}>event host</span>
              <input
                id='eventHost'
                type='text'
                style={hostValid}
                placeholder='Event host*'
                required
                value={this.props.event_create.host.value}
                onChange={(e) => {
                  return this.props.changeInput('host', e.target.value)
                }}
                onBlur={() => {
                  return this.props.validateInput('host', this.props.event_create.host.value)
                }}
              />
            </label>
            <div className={'validationBox'} style={hostValid}>
              <p>Please enter a host for this event</p>
            </div>
            <label htmlFor='eventStart' style={{margin:'auto'}}>Event start date and time</label>
            <input
              id='eventStart'
              type='datetime-local'
              style={start_timeValid}
              placeholder='Event start date and time*'
              required
              value={this.props.event_create.start_time.value}
              onChange={(e) => {
                return this.props.changeInput('start_time', e.target.value)
              }}
              onBlur={() => {
                return this.props.validateInput('start_time', this.props.event_create.start_time.value)
              }}
            />
            <div className={'validationBox'} style={start_timeValid}>
              <p>The start time should not be in the past</p>
            </div>
            <label htmlFor='eventEnd' style={{margin:'auto'}}>Event end date and time</label>
            <input
              id='eventEnd'
              type='datetime-local'
              style={end_timeValid}
              placeholder='Event end date and time*'
              required
              value={this.props.event_create.end_time.value}
              onChange={(e) => {
                return this.props.changeInput('end_time', e.target.value)
              }}
              onBlur={() => {
                return this.props.validateInput('end_time', this.props.event_create.end_time.value)
              }}
            />
            <div className={'validationBox'} style={end_timeValid}>
              <p>The end time must come after the start time</p>
            </div>
            <label htmlFor='eventGuests' type='text'>
              <span style={{display:'none'}}>Guest list</span>
              <input
                id='eventGuests'
                type='text'
                style={guest_listValid}
                placeholder='Guest list*'
                value={this.props.event_create.guest_list.value}
                onChange={(e) => {
                  return this.props.changeInput('guest_list', e.target.value)
                }}
                onBlur={() => {
                  return this.props.validateInput('guest_list', this.props.event_create.guest_list.value)
                }}
              />
            </label>
            <div className={'validationBox'} style={guest_listValid}>
              <p>Please enter a value</p>
            </div>
            <label htmlFor='eventLocation' type='text'>
              <span style={{display:'none'}}>Location</span>
              <input
                id='eventLocation'
                type='text'
                style={locationValid}
                placeholder='Location*'
                required
                value={this.props.event_create.location.value}
                onChange={(e) => {
                  return this.props.changeInput('location', e.target.value)
                }}
                onBlur={() => {
                  return this.props.validateInput('location', this.props.event_create.location.value)
                }}
              />
            </label>
            <div className={'validationBox'} style={locationValid}>
              <p>Please enter a location</p>
            </div>
            <label htmlFor='eventAdditional' type='text'>
              <span style={{display:'none'}}>Additional information</span>
              <textarea
                id='eventAdditional'
                type='text'
                placeholder='Additional information'
                value={this.props.event_create.additional_info}
                onChange={(e) => {
                  return this.props.changeOptionalInput('additional_info', e.target.value)
                }}
              />
            </label>
            <button onClick={() => this.props.saveEvent()}>Create event</button>
          </div>
          <EventItem
            name={this.props.event_create.name.value}
            type={this.props.event_create.type.value}
            host={this.props.event_create.host.value}
            start_time={this.props.event_create.start_time.value}
            end_time={this.props.event_create.end_time.value}
            guest_list={this.props.event_create.guest_list.value}
            location={this.props.event_create.location.value}
            additional_info={this.props.event_create.additional_info}
          />
      </div>
    </div>
   );
  }
}

const mapStateToProps = state => ({...state});

module.exports = connect(mapStateToProps,mapDispatchToProps)(Event);
