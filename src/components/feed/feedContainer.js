import React from 'react'
// import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import ProfilePicContainer from './profilePicContainer'
// import CoverPhotoContainer from './coverPhotoContainer'
import FeedWall from './feedWall'

// import AuthAdapter from '../../authAdapter'

import GetPosts from '../../actions/getPosts'
import GetUsers from '../../actions/getUsers'
import GetFriendsList from '../../actions/getFriendsList'

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('id')
    }
  }

  componentDidMount() {
    this.props.getPosts()
    this.props.getUsers()
    this.props.getFriendsList(this.state)
  }

  renderFeedWall = () => {
    return (
      <FeedWall />
    )
  }

  render() {
    return(
      <div className="mainBody">
        {this.renderFeedWall()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    posts: state.posts,
    users: state.users,
    friends: state.friends
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPosts: GetPosts,
    getUsers: GetUsers,
    getFriendsList: GetFriendsList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
