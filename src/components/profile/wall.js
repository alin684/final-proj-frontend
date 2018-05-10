import React from 'react'
// import { Container, Button, Divider, Form, Message, Icon } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Post from './post'

import GetPosts from '../../actions/getPosts'

class Wall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('id')
    }
  }

  componentWillMount() {
    this.props.getPosts()
  }

  displayUsersPosts = () => {
    if (this.props.posts.length > 0) {
      const filteredPosts = this.props.posts.filter(post => post.receiver_id == this.props.currentPageUserId)
      return filteredPosts.slice(0).reverse().map(post => <Post key={post.id} post={post} />)
    } else {
      console.log("loading posts")
    }
  }

  render() {
    return(
      <div className="wall">
        {this.displayUsersPosts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPosts: GetPosts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wall)
