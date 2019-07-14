import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Counter } from './components/index';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:count" component={Counter} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
