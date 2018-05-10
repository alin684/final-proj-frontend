export default function usersReducer (state = {}, action) {
  switch(action.type) {
    case 'GET_USERS': {
      return action.payload
    }
    case 'CLEAR_USERS': {
      return action.payload
    }
    case 'SET_PHOTO': {
      return action.payload
    }
    default: {
      return state
    }
  }
}
