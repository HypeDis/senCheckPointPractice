import { createStore, applyMiddleware } from 'redux';
import actions from './actions';

const {
  types: { INCREMENT, SET_HEALTH, SET_COUNT },
} = actions;

const initialState = {
  count: 0,
  health: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case SET_HEALTH:
      return {
        ...state,
        health: action.data,
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.count,
      };
    default:
      return state;
  }
};

const loggingMiddleware = store => next => action => {
  console.log('Current State: ', store.getState());
  const nextState = next(action);
  console.log('Next State: ', store.getState());
  return nextState;
};

const reduxThunk = store => next => action => {
  if (typeof action === 'function') {
    action(store.dispatch, store.getState);
  } else {
    return next(action);
  }
};

const store = createStore(rootReducer, applyMiddleware(loggingMiddleware, reduxThunk));

export default store;
