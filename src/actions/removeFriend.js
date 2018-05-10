import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function removeFriend(state) {
  return (dispatch) => {
    dispatch({ type: 'NOW_REMOVING_FRIEND' });
    return fetch(`${baseUrl}/removefriend`, {
      method: 'DELETE',
      body: JSON.stringify(state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch({ type: 'REMOVE_FRIEND', payload: json}))
  }
}
