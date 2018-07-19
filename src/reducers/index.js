import { combineReducers } from 'redux'
import currentUserReducer from './currentUser'
import postsReducer from './posts'
import usersReducer from './users'
import friendsReducer from './friends'
import pendingFriendsReducer from './pendingFriends'
import requestedFriendsReducer from './requestedFriends'

export default combineReducers({
  currentUser: currentUserReducer,
  posts: postsReducer,
  users: usersReducer,
  friends: friendsReducer,
  requestedFriends: requestedFriendsReducer,
  pendingFriends: pendingFriendsReducer
})
