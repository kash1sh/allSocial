import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import combineReducer from '../reducers/index';
let store;
export function configureStore() {
  store = createStore(combineReducer, applyMiddleware(thunk, logger));
  return store;
}
