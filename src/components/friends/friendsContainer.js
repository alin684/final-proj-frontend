import React from 'react'
// import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tab } from 'semantic-ui-react'

import FriendsList from './friendsList'
import PendingFriendsList from './pendingFriendsList'
import RequestedFriendsList from './requestedFriendsList'

import SetUser from '../../actions/setUser'
// import GetPosts from '../../actions/getPosts'
import GetUsers from '../../actions/getUsers'
import GetFriendsList from '../../actions/getFriendsList'
import GetRequestedFriendsList from '../../actions/getRequestedFriendsList'
import GetPendingFriendsList from '../../actions/getPendingFriendsList'

class FriendsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('id')
    }
  }

  componentDidMount() {
    this.props.getUsers()
    this.props.getFriendsList(this.state)
    this.props.getRequestedFriendsList(this.state)
    this.props.getPendingFriendsList(this.state)
  }

  // handleFriendsClick = () => {
  //   this.setState({
  //     friendspagestate: "friends"
  //   })
  // }
  //
  // handleRequestedFriendsClick = () => {
  //   this.setState({
  //     friendspagestate: "requestedFriends"
  //   })
  // }
  //
  // handlePendingFriendsClick = () => {
  //   this.setState({
  //     friendspagestate: "pendingFriends"
  //   })
  // }

  // renderList = () => {
  //   if (this.state.friendspagestate === "friends") {
  //     return <FriendsList />
  //   } else if (this.state.friendspagestate === "requestedFriends") {
  //     return <RequestedFriendsList />
  //   } else if (this.state.friendspagestate === "pendingFriends") {
  //     return <PendingFriendsList />
  //   }
  // }
  //
  // <button className="ui basic button" onClick={this.handleFriendsClick}><i className="icon user"></i>Friends</button>
  // <button className="ui basic button" onClick={this.handleRequestedFriendsClick}><i className="icon user"></i>Requested Friends</button>
  // <button className="ui basic button" onClick={this.handlePendingFriendsClick}><i className="icon user"></i>Pending Friend Requests</button>
  // {this.renderList()}

  render() {
    const panes = [
      { menuItem: 'Friends', render: () => <Tab.Pane><FriendsList /></Tab.Pane> },
      { menuItem: 'Requested Friends', render: () => <Tab.Pane><RequestedFriendsList /></Tab.Pane> },
      { menuItem: 'Pending Friends', render: () => <Tab.Pane><PendingFriendsList /></Tab.Pane> },
    ]

    return(
      <div className="mainBody">
        <div className="friendsContainer">
          <Tab className="friendsTabs" panes={panes} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    users: state.users,
    friends: state.friends,
    requestedFriends: state.requestedFriends,
    pendingFriends: state.pendingFriends
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: SetUser,
    getUsers: GetUsers,
    getFriendsList: GetFriendsList,
    getRequestedFriendsList: GetRequestedFriendsList,
    getPendingFriendsList: GetPendingFriendsList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)
