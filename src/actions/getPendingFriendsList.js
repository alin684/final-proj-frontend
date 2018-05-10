import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function getPendingFriendsList(state) {
  return (dispatch) => {
    dispatch({ type: 'NOW_GETTING_PENDING_FRIENDS_LIST' });
    return fetch(`${baseUrl}/getpendingfriendslist`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch({ type: 'GET_PENDING_FRIENDS_LIST', payload: json}))
  }
}
