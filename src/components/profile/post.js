import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import GetUsers from '../../actions/getUsers'

import DeletePost from '../../actions/deletePost'

class Post extends React.Component {

  componentDidMount() {
    this.props.getUsers()
  }

  renderPosterSenderNames = () => {
    if (this.props.users.length > 0) {
      const poster = this.props.users.find(user => user.id == this.props.post.poster_id)
      const receiver = this.props.users.find(user => user.id == this.props.post.receiver_id)
      if (poster == receiver) {
        return (
          <div>
            <span className="nameLink">
              <Link to={`/users/${poster.id}`}>{poster.first_name} {poster.last_name}</Link>
            </span>
            <span> (status) </span>
          </div>
        )
      } else {
        return (
          <div>
            <span className="nameLink">
              <Link to={`/users/${poster.id}`}>{poster.first_name} {poster.last_name}</Link>
            </span>
            <span> > </span>
            <span className="nameLink">
              <Link to={`/users/${receiver.id}`}>{receiver.first_name} {receiver.last_name}</Link>
            </span>
          </div>
        )
      }
    }
  }

  deletePost = () => {
    this.props.deletePost(this.props.post.id)
  }

  // <div className="deleteButton" onClick={this.deletePost}>
  //   <button>Delete</button>
  // </div>

  render() {
    if (this.props.post) {
      return(
        <div className="postBox">
          <div className="postPosterAndSender">
            {this.renderPosterSenderNames()}
          </div>
          <div className="postContent">
            {this.props.post.content}
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers: GetUsers,
    deletePost: DeletePost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
