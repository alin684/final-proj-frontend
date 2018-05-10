import React, { Component } from 'react'
import { Button, Divider, Form, Message, Icon } from 'semantic-ui-react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SetUser from '../../actions/setUser'

const baseUrl = `http://localhost:3000/api/v1`;

class SignUpForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      redirect: false,
      error: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      if( json.error ){
        this.setState({ error: true })
      } else {
        localStorage.setItem('id', json.user.id)
        localStorage.setItem('jwt', json.jwt)
        this.props.setUser(json.user)
        this.setState({ redirect: true })
      }
    })
  }

  handleChange = (event) => {
    let key = `${event.target.name}`
    let value = `${event.target.value}`
    this.setState({
      [key]: value
    })
  }

  render() {
    let message = <Message attached='bottom' warning>
      <Icon name='warning circle' />
      Please try again.
    </Message>

    return (
      <div className='signUpFormContainer'>
        {this.state.redirect ? <Redirect to="/" /> : null }
        <Form className='signUpForm' onSubmit={this.handleSubmit}>
          <Form.Field name="first_name" label='First Name' control='input' placeholder='First name' onChange={this.handleChange} required/>
          <Form.Field name="last_name" label='Last Name' control='input' placeholder='Last name'  onChange={this.handleChange} required/>
          <Form.Field name="email" label='Email' control='input' placeholder='Email address'  onChange={this.handleChange} required/>
          <Form.Field name="password" label='Password' control='input' placeholder='Password' type='password' onChange={this.handleChange} required/>
          <Button className="frontButton" type='submit'>Submit</Button>
          <Divider hidden />
        </Form>
        {this.state.error? message : null}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: SetUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUpForm)
