import { APIUrls } from '../helper/url';
import { UPDATE_POSTS } from './actionTypes';
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        console.log('response:', response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}
export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
