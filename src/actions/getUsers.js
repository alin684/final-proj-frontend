import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function getUsers() {
  return (dispatch) => {
    dispatch({ type: 'GETTING_ALL_USERS' });
    return fetch(`${baseUrl}/getusers`)
    .then(res => res.json())
    .then(json => dispatch({ type: 'GET_USERS', payload: json}))
  }
}
