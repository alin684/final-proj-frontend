import React from 'react'
// import { Container, Button, Divider, Form, Message, Icon } from 'semantic-ui-react'
import { Button, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CreatePost from '../../actions/createPost'

// const baseUrl = `http://localhost:3000/api/v1`;

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      poster_id: localStorage.getItem('id'),
      receiver_id: this.props.currentPageUserId
    }
  }

  submitNewPost = (event) => {
    event.preventDefault()
    this.props.createPost(this.state)
    event.target.reset()
  }

  handleChange = (event) => {
    let value = `${event.target.value}`
    this.setState({
      content: value
    })
  }

  render() {
    return(
      <Form className="newPostBox" onSubmit={this.submitNewPost}>
        <Form.Field className="newPostInput" name="content" control='input' placeholder='Type your post here...' onChange={this.handleChange} required/>
        <Button className="newPostSubmitButton" type='submit'>Post</Button><br /><br />
      </Form>
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
    createPost: CreatePost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
