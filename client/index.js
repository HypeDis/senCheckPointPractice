import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Router from './router';

// const { store } = redux;

const appDiv = document.getElementById('app');

class HomePage extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

ReactDOM.render(<HomePage />, appDiv);
