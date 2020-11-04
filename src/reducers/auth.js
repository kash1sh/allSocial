import {
  AUTHENTICATE_USER,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CLEAR_AUTH_STATE,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  isLoggedIn: false,
  inProgress: false,
  error: null,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        isLoggedIn: true,
        error: null,
      };

    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };

    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
