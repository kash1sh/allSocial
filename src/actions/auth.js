import { APIUrls } from '../helper/url';
import {
  AUTHENTICATE_USER,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
} from './actionTypes';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helper/utils';
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          // localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logOutUser() {
  return {
    type: LOG_OUT,
  };
}

export function startSignUp() {
  return {
    type: SIGNUP_START,
  };
}

export function signup(name, email, password, repassword) {
  return (dispatch) => {
    dispatch(startSignUp());
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ name, email, password, repassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(SignUpSuccess(data.data.user));
          return;
        }
        dispatch(SignUpFailed(data.message));
      });
  };
}

export function SignUpFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function SignUpSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccess(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user,
  };
}

export function editUSerFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function EditUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('dataaa : ', data);

        if (data.success) {
          dispatch(editUserSuccess(data.data.user));
          if (data.data.token) localStorage.setItem('token', data.data.token);
          return;
        }
        dispatch(editUSerFailed(data.message));
      });
  };
}
