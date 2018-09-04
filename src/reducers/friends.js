export default function friendsReducer (state = {}, action) {
  switch(action.type) {
    case 'GET_FRIENDS_LIST': {
      return action.payload
    }
    case 'REMOVE_FRIEND': {
      return action.payload
    }
    default: {
      return state
    }
  }
}
