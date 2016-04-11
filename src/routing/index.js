'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as NavigationActions from './actions.js';
import _routes from './routes.js';

import Footer from '../features/footer.js';

class Router extends Component {

  render () {

    const Component = _routes[this.props.route.name].component;
    const fullProps = { ...this.props, routeProps: { ...this.props.route.props } };

    return (
      <div>
        <Component {...fullProps} />
        <Footer {...fullProps}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.router, state });

export default connect(mapStateToProps, NavigationActions)(Router);
