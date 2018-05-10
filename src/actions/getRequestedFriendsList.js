import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function getRequestedFriendsList(state) {
  return (dispatch) => {
    dispatch({ type: 'NOW_GETTING_REQUESTED_FRIENDS_LIST' });
    return fetch(`${baseUrl}/getrequestedfriendslist`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch({ type: 'GET_REQUESTED_FRIENDS_LIST', payload: json}))
  }
}
