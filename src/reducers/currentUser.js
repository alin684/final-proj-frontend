export default function currentUserReducer (state = {}, action) {
  switch(action.type) {
    case 'SET_USER': {
      return action.payload
    }
    case 'CLEAR_USER': {
      return action.payload
    }
    // case 'SET_PHOTO': {
    //   return action.payload
    // }
    default: {
      return state
    }
  }
}
