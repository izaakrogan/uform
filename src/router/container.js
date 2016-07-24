'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
const RouterActions = require('./index.js')().actions;
const _routes = require('./routes/index.js');

const mapDispatchToProps = {
  ...RouterActions
};

const Router = (props) => {
  const Component = _routes[props.route.name].component;
  return (
    <div className='superContainer'>
      <Component />
    </div>
  );
};

const mapStateToProps = state => ({ ...state.router, state });
export default connect(mapStateToProps,mapDispatchToProps)(Router);
