'use strict';

import React, { Component } from 'react';
import Router from './routing/index.js';
import { Provider } from 'react-redux';
import configureStore from './configure_store.js';

const store = configureStore();

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router />
        </div>
      </Provider>
    );
  }
}
