import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function deletePost(id) {
  return (dispatch) => {
    dispatch({ type: 'NOW_DELETING_POST' });
    return fetch(`${baseUrl}/deletepost`, {
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch({ type: 'DELETE_POST', payload: json}))
  }
}
