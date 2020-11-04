// const { combineReducers } = require('redux');

import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import sign from './sign';
export default combineReducers({
  posts,
  auth,
  sign,
});
