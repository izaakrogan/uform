'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as LoginActions from './actions.js';
import styles from '../styles.js';

const mapDispatchToProps = {
  ...LoginActions
}

class Login extends Component {

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.autoFocusInput).focus();
  }

  render() {
    return (
      <div style={Object.assign({}, styles.container, {paddingTop:'100'})}>
        <h2 style={Object.assign({}, styles.header, {paddingBottom:'20'})}>Login</h2>
        <label style={styles.label} for='email' type='text'>
          <span style={{display:'none'}}>Email address</span>
          <input
            ref="autoFocusInput"
            id='email'
            style={styles.input}
            placeholder="email"
            autocomplete="email"
            name="email"
            required
            value={this.props.login.email}
            onChange={(e) => {
              return this.props.changeInput('email', e.target.value)
            }}
          />
        </label>
        <label style={styles.label} for='password' type='text'>
          <span style={{display:'none'}}>Password</span>
          <input
            id='password'
            style={styles.input}
            type="text"
            placeholder='password'
            type='password'
            required
            value={this.props.login.password}
            onChange={(e) => {
              return this.props.changeInput('password', e.target.value)
            }}
          />
        </label>
        <div style={{display:'flex',flexDirection:'row', width:400, margin:'auto'}}>
          <button onClick={() => this.props.navigateTo({name:'registration'})} style={styles.button}>register</button>
          <button onClick={() => this.props.login()} style={styles.button}>login</button>
        </div>
      </div>
   );
  }
}


const mapStateToProps = state => ({...state});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
