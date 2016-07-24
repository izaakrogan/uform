'use strict';

import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
const LoginActions = require('../index.js')().actions;
const {actions} = require('../external.js');

const mapDispatchToProps = {
  ...LoginActions,
  ...actions.router
};

class Login extends Component {

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.autoFocusInput).focus();
  }

  render () {
    return (
      <div className="container loginReg">
        <h2>LOGIN</h2>
        <label for='email' type='text'>
          <span style={{display:'none'}}>Email address</span>
          <input
            ref="autoFocusInput"
            id='email'
            placeholder="email"
            autocomplete="email"
            name="email"
            required
            value={this.props.login.email}
            onChange={(e) => {
              return this.props.updateLoginField('email', e.target.value);
            }}
          />
        </label>
        <label for='password' type='text'>
          <span style={{display:'none'}}>Password</span>
          <input
            id='password'
            type="text"
            placeholder='password'
            type='password'
            required
            value={this.props.login.password}
            onChange={(e) => {
              return this.props.updateLoginField('password', e.target.value);
            }}
          />
        </label>
        <div className={'buttonContainer'}>
          <button onClick={() => this.props.navigateTo({name:'register'})}>register</button>
          <button onClick={() => this.props.submitLogin()}>login</button>
        </div>
      </div>
   );
  }
}

const mapStateToProps = state => ({...state});

module.exports = connect(mapStateToProps,mapDispatchToProps)(Login);
