'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const RegistrationActions = require('../index.js')().actions;
const {actions,styles} = require('../external.js')

const mapDispatchToProps = {
  ...RegistrationActions,
  ...actions.router
}

class Register extends Component {

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.autoFocusInput).focus();
  }

  render() {
    var nameValid = this.props.register.name.validated === false ? {borderColor: 'red', display:'block'} : {};
    var emailValid = this.props.register.email.validated === false ? {borderColor: 'red', display:'block'} : {};
    var passwordValid = this.props.register.password.validated === false ? {borderColor: 'red', display:'block'} : {};
    return (
      <div className="container loginReg">
        <h2 style={Object.assign({}, styles.header, {paddingBottom:20})}>Register</h2>
        <label htmlFor='regName' type='text'>
          <span style={{display:'none'}}>Name</span>
          <input
            ref="autoFocusInput"
            id='regName'
            style={nameValid}
            type="text"
            autocomplete="name"
            name="name"
            placeholder='Name*'
            required
            value={this.props.register.name.value}
            onChange={(e) => {
              return this.props.changeInput('name', e.target.value)
            }}
            onBlur={() => {
              return this.props.validateInput('name', this.props.register.name.value)
            }}
          />
        </label>
        <div className={'validationBox'} style={nameValid}>
          <p>Please enter your name</p>
        </div>
        <label htmlFor='regEmail' type='text'>
          <span style={{display:'none'}}>Email address</span>
          <input
            id='regEmail'
            style={emailValid}
            type="email"
            autocomplete="email"
            name="email"
            placeholder='Email Address*'
            required
            value={this.props.register.email.value}
            onChange={(e) => {
              return this.props.changeInput('email', e.target.value)
            }}
            onBlur={() => {
              return this.props.validateInput('email', this.props.register.email.value)
            }}
          />
        </label>
        <div className={'validationBox'} style={emailValid}>
          <p>Please enter a valid email address</p>
        </div>
        <label htmlFor='regPassword' type='text'>
          <span style={{display:'none'}}>Password - minimum 4 letters and 1 numbers</span>
          <input
            id='regPassword'
            style={passwordValid}
            placeholder='Password (minimum 4 letters 1 number)*'
            required
            type='password'
            value={this.props.register.password.value}
            onChange={(e) => {
              return this.props.changeInput('password', e.target.value)
            }}
            onBlur={() => {
              return this.props.validateInput('password', this.props.register.password.value)
            }}
          />
        </label>
        <div className={'validationBox'} style={passwordValid}>
          <p>At least 4 characters and one number</p>
        </div>
        <label htmlFor='regJob' type='text'>
          <span style={{display:'none'}}>job title</span>
          <input
            id='regJob'
            type="text"
            placeholder='Job title'
            value={this.props.register.jobtitle.value}
            onChange={(e) => {
              return this.props.changeInput('jobtitle', e.target.value)
            }}
          />
        </label>
        <label htmlFor='regEmployer' type='text'>
          <span style={{display:'none'}}>employer</span>
          <input
            id='regEmployer'
            type="text"
            placeholder='Employer'
            value={this.props.register.employer.value}
            onChange={(e) => {
              return this.props.changeInput('employer', e.target.value)
            }}
          />
        </label>
        <div className={'buttonContainer'}>
          <button onClick={() => this.props.navigateTo({name:'login'})}>
            back
          </button>
          <button onClick={() =>this.props.submitRegister()}>
            register
          </button>
        </div>
      </div>
   );
  }
}

const mapStateToProps = state => ({...state});

module.exports = connect(mapStateToProps,mapDispatchToProps)(Register);
