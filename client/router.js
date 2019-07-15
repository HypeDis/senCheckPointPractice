import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Users, Profile, UpdateUser } from './components';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/users" component={Users} />
          <Route exact path="/profiles/:userId" component={Profile} />
          <Route path="/profiles/:userId/update" component={UpdateUser} />
          <Redirect to="/users" />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
