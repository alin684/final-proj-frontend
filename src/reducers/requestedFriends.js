export default function requestedFriendsReducer (state = {}, action) {
  switch(action.type) {
    case 'GET_REQUESTED_FRIENDS_LIST': {
      return action.payload
    }
    case 'ACCEPT_FRIEND_REQUEST': {
      return action.payload
    }
    default: {
      return state
    }
  }
}
