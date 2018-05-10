import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function sendFriendRequest(state) {
  return (dispatch) => {
    dispatch({ type: 'NOW_SENDING_FRIEND_REQUEST' });
    return fetch(`${baseUrl}/sendfriendrequest`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch({ type: 'SEND_FRIEND_REQUEST', payload: json}))
  }
}
