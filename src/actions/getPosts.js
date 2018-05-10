import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function getPosts() {
  return (dispatch) => {
    dispatch({ type: 'GETTING_ALL_POSTS' });
    return fetch(`${baseUrl}/getposts`)
    .then(res => res.json())
    .then(json => dispatch({ type: 'GET_POSTS', payload: json}))
  }
}
