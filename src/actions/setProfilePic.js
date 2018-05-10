import fetch from 'isomorphic-fetch';

const baseUrl = `http://localhost:3000/api/v1`;

export default function setProfilePic(state) {
  return (dispatch) => {
    dispatch({ type: 'NOW_SETTING_PROFILE_PIC' });
    return fetch(`${baseUrl}/uploadphoto`, {
      method: 'PUT',
      body: JSON.stringify(state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch({ type: 'SET_PHOTO', payload: json}))
  }
}
