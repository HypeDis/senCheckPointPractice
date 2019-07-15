import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

//action constants
const GOT_USERS_FROM_DB = 'GOT_USERS_FROM_DB';
const GOT_USER_AND_PROFILE_FROM_DB = 'GOT_USER_AND_PROFILE_FROM_DB';

// action creators
export const gotUsersFromDb = users => {
  const action = { type: GOT_USERS_FROM_DB, users };
  return action;
};

export const gotUserAndProfileFromDb = userProfile => {
  const action = { type: GOT_USER_AND_PROFILE_FROM_DB, userProfile };
  return action;
};

// thunk creators
export const getUsersFromDb = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => {
        console.log('get users resonse', response.data);
        dispatch(gotUsersFromDb(response.data));
      })
      .catch(e => console.error(e));
  };
};

export const getUserProfileFromDb = userId => {
  return dispatch => {
    return axios
      .get(`/api/profiles/${userId}`)
      .then(response => {
        dispatch(gotUserAndProfileFromDb(response.data));
      })
      .catch(e => console.error('user profile error', e));
  };
};

const initialState = {
  users: [],
  selectedUser: {
    user: {
      username: '',
      email: '',
    },
    firstName: '',
    lastName: '',
    birthday: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_FROM_DB:
      return { ...state, users: action.users };
    case GOT_USER_AND_PROFILE_FROM_DB:
      return { ...state, selectedUser: action.userProfile };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
