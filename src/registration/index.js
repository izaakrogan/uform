'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles.js';
import * as RegistrationActions from './actions.js';

const mapDispatchToProps = {
  ...RegistrationActions
}

class Registration extends Component {

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.autoFocusInput).focus();
  }

  render() {
    var nameValid = this.props.registration.name.validated === false && {borderColor: 'red'};
    var emailValid = this.props.registration.email.validated === false && {borderColor: 'red'};
    var passwordValid = this.props.registration.password.validated === false && {borderColor: 'red'};
    var nameValid = this.props.registration.name.validated === false && {borderColor: 'red'};
    return (
      <div style={container}>
        <h2 style={styles.header}>Register</h2>
        <label style={styles.label} for='name' type='text'>
          <span style={{display:'none'}}>Name</span>
          <input
            ref="autoFocusInput"
            id='name'
            style={Object.assign({}, styles.input, nameValid)}
            type="text"
            autocomplete="name"
            name="name"
            placeholder='Name'
            required
            value={this.props.registration.name.value}
            onChange={(e) => {
              return this.props.changeInput('name', e.target.value)
            }}
            onBlur={() => {
              return this.props.validateInput('name', this.props.registration.name.value)
            }}
          />
        </label>
        <label style={styles.label} for='email' type='text'>
          <span style={{display:'none'}}>Email address</span>
          <input
            id='email'
            style={Object.assign({}, styles.input, emailValid)}
            type="email"
            autocomplete="email"
            name="email"
            placeholder='Email Address'
            required
            value={this.props.registration.email.value}
            onChange={(e) => {
              return this.props.changeInput('email', e.target.value)
            }}
            onBlur={() => {
              return this.props.validateInput('email', this.props.registration.email.value)
            }}
          />
        </label>
        <label style={styles.label} for='password' type='text'>
          <span style={{display:'none'}}>Password - minimum 4 letters and 1 numbers</span>
          <input
            id='password'
            style={Object.assign({}, styles.input, passwordValid)}
            placeholder='Password (minimum 4 letters 1 number)'
            required
            type='password'
            value={this.props.registration.password.value}
            onChange={(e) => {
              return this.props.changeInput('password', e.target.value)
            }}
            onBlur={() => {
              return this.props.validateInput('password', this.props.registration.password.value)
            }}
          />
        </label>
        <label style={styles.label} for='jobTitle' type='text'>
          <span style={{display:'none'}}>job title</span>
          <input
            id='jobTitle'
            style={styles.input}
            type="text"
            placeholder='Job title'
            required
            value={this.props.registration.jobTitle.value}
            onChange={(e) => {
              return this.props.changeInput('jobTitle', e.target.value)
            }}
          />
        </label>
        <label style={styles.label} for='employer' type='text'>
          <span style={{display:'none'}}>employer</span>
          <input
            id='employer'
            style={styles.input}
            type="text"
            placeholder='Employer'
            required
            value={this.props.registration.employer.value}
            onChange={(e) => {
              return this.props.changeInput('employer', e.target.value)
            }}
          />
        </label>
        <button
          onClick={() => {
            return this.props.register()
          }}
          style={button}
        >
          <p>register</p>
        </button>
      </div>
   );
  }
}

var container = {
  backgroundColor: '#ccc',
  display:'flex',
  flexDirection:'column'
};

var button = {
  width:150,
  height: 40,
  margin:'10px auto'
}



const mapStateToProps = state => ({...state});

export default connect(mapStateToProps,mapDispatchToProps)(Registration);
