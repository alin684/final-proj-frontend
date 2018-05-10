export default function postsReducer (state = {}, action) {
  switch(action.type) {
    case 'CREATE_POST': {
      return action.payload
    }
    case 'GET_POSTS': {
      return action.payload
    }
    case 'CLEAR_POSTS': {
      return action.payload
    }
    case 'DELETE_POST': {
      return action.payload
    }
    default: {
      return state
    }
  }
}
