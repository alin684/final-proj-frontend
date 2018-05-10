import React from 'react'
// import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import NewPost from './newPost'
import Wall from './wall'
import NotFriendView from './notFriendView'
import ProfilePicContainer from './profilePicContainer'
import CoverPhotoContainer from './coverPhotoContainer'
import InfoContainer from './infoContainer'
import PhotoAlbumContainer from './photoAlbumContainer'

import AuthAdapter from '../../authAdapter'

import SetUser from '../../actions/setUser'
import GetPosts from '../../actions/getPosts'
import GetUsers from '../../actions/getUsers'
import GetFriendsList from '../../actions/getFriendsList'
import GetRequestedFriendsList from '../../actions/getRequestedFriendsList'
import GetPendingFriendsList from '../../actions/getPendingFriendsList'

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('id'),
      redirect: false
    }
  }

  changeRedirect = () => {
    this.setState({
      redirect: !this.state.redirect
    }, () => {this.isFriends(this.props.currentPageUserId)})
  }

  componentWillMount() {
    if (localStorage.getItem('jwt')) {
     AuthAdapter.currentUser()
       .then(user => {
         if (!user.error) {
            this.props.setUser(user.user)
          }
        })
    }
  }

  componentDidMount() {
    this.props.getPosts()
    this.props.getUsers()
    this.showUserInfo()
    this.props.getFriendsList(this.state)
    this.props.getRequestedFriendsList(this.state)
    this.props.getPendingFriendsList(this.state)
  }

  showUserInfo = () => {
    if (this.props.users.length > 0){
      const currentPageUser = this.props.users.find(user => user.id == this.props.currentPageUserId)
      return (
        <div>
          <p>{currentPageUser.first_name} {currentPageUser.last_name}</p>
        </div>
      )
    }
  }

  isFriends = (id) => {
    let searchResult = null
    if (this.props.friends.length > 0){
      searchResult = this.props.friends.find(friend => friend.id == id)
    }
    if (searchResult || id == this.state.id || this.state.redirect){
      return true
    } else {
      return false
    }
  }

  renderCoverPhotoContainer = () => {
    return (
      <div>
        <CoverPhotoContainer currentPageUserId={this.props.currentPageUserId} />
      </div>
    )
  }

  renderProfilePicContainer = () => {
    return (
      <div>
        <ProfilePicContainer currentPageUserId={this.props.currentPageUserId} />
      </div>
    )
  }

  renderNewPost = () => {
    return (
      <div>
        <NewPost currentPageUserId={this.props.currentPageUserId}/>
      </div>
    )
  }

  renderInfo = () => {
    return (
      <div>
        <InfoContainer />
      </div>
    )
  }

  renderPhotoAlbums = () => {
    return (
      <div>
        <PhotoAlbumContainer />
      </div>
    )
  }

  renderWall = () => {
    return (
      <div>
        <Wall currentPageUserId={this.props.currentPageUserId} />
      </div>
    )
  }

  renderNotFriendView = () => {
    return (
      <div className="notFriendView">
        <NotFriendView currentPageUserId={this.props.currentPageUserId} changeRedirect={this.changeRedirect}/>
      </div>
    )
  }

  render() {
    return(
      <div className="mainBody">
        {this.isFriends(this.props.currentPageUserId) ? <div>{this.renderCoverPhotoContainer()} {this.renderProfilePicContainer()} {this.renderInfo()} {this.renderPhotoAlbums()} {this.renderNewPost()} {this.renderWall()}</div> : <div>{this.renderCoverPhotoContainer()} {this.renderProfilePicContainer()} {this.renderNotFriendView()}</div>}
        <div className="showNameOnProfile">{this.showUserInfo()}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    posts: state.posts,
    users: state.users,
    friends: state.friends,
    requestedFriends: state.requestedFriends,
    pendingFriends: state.pendingFriends
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: SetUser,
    getPosts: GetPosts,
    getUsers: GetUsers,
    getFriendsList: GetFriendsList,
    getRequestedFriendsList: GetRequestedFriendsList,
    getPendingFriendsList: GetPendingFriendsList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
