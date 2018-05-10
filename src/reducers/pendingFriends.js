export default function pendingFriendsReducer (state = {}, action) {
  switch(action.type) {
    case 'GET_PENDING_FRIENDS_LIST': {
      return action.payload
    }
    case 'SEND_FRIEND_REQUEST': {
      return action.payload
    }
    default: {
      return state
    }
  }
}
