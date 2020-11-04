// import { SIGN_UP_FAILED, SIGN_UP_START, SIGN_UP_SUCCESS } from './actionTypes';
// import { APIUrls } from '../helper/url';
// import { getFormBody } from '../helper/utils';
// export function startSign() {
//   return {
//     type: SIGN_UP_START,
//   };
// }

// export function SignFailed(errorMessage) {
//   return {
//     type: SIGN_UP_FAILED,
//     error: errorMessage,
//   };
// }

// export function SignSuccess(user) {
//   return {
//     type: SIGN_UP_SUCCESS,
//     user,
//   };
// }

// export function signup(name, email, password, repassword) {
//   return (dispatch) => {
//     dispatch(startSign());
//     const url = APIUrls.signup();
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded',
//       },
//       body: getFormBody({ name, email, password, repassword }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('data', data);
//         if (data.success) {
//           localStorage.setItem('token', data.data.token);
//           dispatch(SignSuccess(data.data.user));
//           return;
//         }
//         dispatch(SignFailed(data.message));
//       });
//   };
// }
