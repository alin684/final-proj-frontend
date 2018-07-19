import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import NavBar from './components/users/navBar'
import Login from './components/users/login'
import SignUpForm from './components/users/signup'

import ProfileContainer from './components/profile/profileContainer'
import FriendsContainer from './components/friends/friendsContainer'
import FeedContainer from './components/feed/feedContainer'

import AuthAdapter from './authAdapter'
import SetUser from './actions/setUser'

class App extends Component {

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

  isLoggedIn = () => {
    return !!localStorage.getItem('jwt')
  }

  doesUserExist = () => {

  }

  render() {
    return (
        <Router>
            <div className="parent">
              <Route component={NavBar}/>
              <Route exact path='/' render={()=> this.isLoggedIn() ? <Redirect to={"/users/" + this.props.currentUser.id} /> : <Login /> } />
              <Route path='/users/:id' render={
                (renderProps) => {
                  const id = renderProps.match.params.id
                  console.log(id)
                  return this.isLoggedIn() ? <ProfileContainer currentPageUserId={id} /> : <Redirect to="/" />
                }
              } />
              <Route exact path='/feed' render={()=> this.isLoggedIn() ? <FeedContainer /> : <Login /> } />
              <Route exact path='/friends' render={()=> this.isLoggedIn() ? <FriendsContainer /> : <Login /> } />
              <Route exact path='/signup' render={()=> this.isLoggedIn() ? <Redirect to="/" /> : <SignUpForm /> } />
            </div>
        </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: SetUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
