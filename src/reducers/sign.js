// import {
//   SIGNUP_FAILED,
//   SIGN_UP_START,
//   SIGN_UP_SUCCESS,
// } from '../actions/actionTypes';

// const initialSignState = {
//   user: {},
//   isSignedUp: false,
//   inProgress: false,
//   error: null,
// };

// export default function sign(state = initialSignState, action) {
//   switch (action.type) {
//     case SIGN_UP_START:
//       return {
//         ...state,
//         inProgress: true,
//       };

//     case SIGN_UP_SUCCESS:
//       return {
//         ...state,
//         user: action.user,
//         inProgress: false,
//         isSignedUp: true,
//         error: null,
//       };

//     case SIGN_UP_FAILED:
//       return {
//         ...state,
//         error: action.error,
//         inProgress: false,
//       };
//     default:
//       return state;
//   }
// }
