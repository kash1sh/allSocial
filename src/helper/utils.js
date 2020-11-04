export function getFormBody(params) {
  let formBody = [];
  // params[property] & Sign up & data.data.user different from data.token & need of authenticate user
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
