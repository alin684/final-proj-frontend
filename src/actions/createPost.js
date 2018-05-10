import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function createPost(state) {
  return (dispatch) => {
    dispatch({ type: 'NOW_ADDING_POST' });
    return fetch(`${baseUrl}/newpost`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch({ type: 'CREATE_POST', payload: json}))
  }
}
