'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as NavigationActions from './actions.js';
import * as LoginActions from '../login/actions.js';
import _routes from './routes.js';

const mapDispatchToProps = {
  ...NavigationActions,
  ...LoginActions
};

class Router extends Component {

  render () {

    const Component = _routes[this.props.route.name].component;
    const fullProps = { ...this.props, routeProps: { ...this.props.route.props } };

    return (
      <div>
        <Component {...fullProps} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.router, state });

export default connect(mapStateToProps, mapDispatchToProps)(Router);
