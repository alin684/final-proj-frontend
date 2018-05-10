import React, { Component } from 'react'
import { Button, Divider, Form, Message, Icon } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import AuthAdapter from '../../authAdapter'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SetUser from '../../actions/setUser'

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      redirect: false,
      password: ''
    }
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
      error: false
    })
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
      error: false
    })
  }

  onLogin = (loginParams) => {
  AuthAdapter.login(loginParams)
    .then( json => {
      if( json.error ){
        this.setState({ error: true })
      } else {
        localStorage.setItem('jwt', json.jwt)
        localStorage.setItem('id', json.user.id)
        this.props.setUser(json.user)
        this.setState({ redirect: true })
      }
    })
  }

  render() {
    let message = <Message attached='bottom' warning>
      <Icon name='warning circle' />
      This email does not exist in our database. Please try again or sign up.
    </Message>

    return(
      <div className="loginContainer">
          {this.state.redirect ? <Redirect to={`/`} /> : null }
          <div className="App">
            <br />
            <Form className='loginForm' onSubmit={() => this.onLogin(this.state)}>
              <Form.Field onChange={this.handleChangeEmail} label='Email' control='input' placeholder='Email' required/>
              <Form.Field onChange={this.handleChangePassword} label='Password' control='input' type='password' placeholder='Password' required/>
              <Button className="frontButton" type='submit'>Login</Button><br /><br />
              or
              <Link to="/signup"> Sign Up</Link>
              <Divider hidden />
            </Form>
            {this.state.error? message : null}
          </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: SetUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginForm)
