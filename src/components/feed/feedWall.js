import React from 'react'
// import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import ProfilePicContainer from './profilePicContainer'
// import CoverPhotoContainer from './coverPhotoContainer'
import Post from '../profile/post'
// import AuthAdapter from '../../authAdapter'

import GetPosts from '../../actions/getPosts'
import GetUsers from '../../actions/getUsers'
import GetFriendsList from '../../actions/getFriendsList'

class FeedWall extends React.Component {
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

  displayAllFriendsPosts = () => {
    if (this.props.posts.length > 0) {
      const filteredPosts = this.props.posts.filter(post => post.receiver_id == this.state.id || post.poster_id == this.state.id || post.poster_id == post.receiver_id)
      return filteredPosts.slice(0).reverse().map(post => <Post key={post.id} post={post} />)
    } else {
      console.log("loading posts")
    }
  }

  render() {
    return (
      <div className="feedContainer">
        {this.displayAllFriendsPosts()}
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedWall)
