import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import { Container, Button, Divider, Form, Message, Icon } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SendFriendRequest from '../../actions/sendFriendRequest'
import AcceptFriendRequest from '../../actions/acceptFriendRequest'

// import {withRouter} from "react-router-dom";

class notFriendView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sender_id: localStorage.getItem('id'),
      acceptor_id: this.props.currentPageUserId
      }
  }

  handleAddFriend = (event) => {
    event.preventDefault()
    this.props.sendFriendRequest(this.state)
  }

  handleAcceptFriendRequest = (event) => {
    event.preventDefault()
    let stat = {acceptor_id: this.state.sender_id, sender_id: this.state.acceptor_id}
    this.props.acceptFriendRequest(stat)
    this.props.changeRedirect()
  }

  renderButton = () => {
    if (this.props.pendingFriends.length > 0 || this.props.requestedFriends.length > 0) {
      if (this.props.pendingFriends.length > 0) {
        if (this.props.pendingFriends.find(friend => friend.id == this.props.currentPageUserId)) {
          return (
            <div>
              <button className="ui basic button notFriendViewButton">
                <i className="icon user"></i>
                Friend Request Pending
              </button>
            </div>
          )
        } else if (this.props.requestedFriends.length > 0) {
          if (this.props.requestedFriends.find(friend => friend.id == this.props.currentPageUserId)) {
            return (
              <div>
                <button className="ui basic button notFriendViewButton" onClick={this.handleAcceptFriendRequest}>
                  <i className="icon user"></i>
                  Accept Friend Request
                </button>
              </div>
            )
          } else {
            return (
              <div>
                <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
                  <i className="icon user"></i>
                  Add Friend
                </button>
              </div>
            )
          }
        } else {
          return (
            <div>
              <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
                <i className="icon user"></i>
                Add Friend
              </button>
            </div>
          )
        }
      } else if (this.props.requestedFriends.length > 0) {
        if (this.props.requestedFriends.find(friend => friend.id == this.props.currentPageUserId)) {
          return (
            <div>
              <button className="ui basic button notFriendViewButton" onClick={this.handleAcceptFriendRequest}>
                <i className="icon user"></i>
                Accept Friend Request
              </button>
            </div>
          )
        } else if (this.props.pendingFriends.length > 0) {
          if (this.props.pendingFriends.find(friend => friend.id == this.props.currentPageUserId)) {
            return (
              <div>
                <button className="ui basic button notFriendViewButton">
                  <i className="icon user"></i>
                  Friend Request Pending
                </button>
              </div>
            )
          } else {
            return (
              <div>
                <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
                  <i className="icon user"></i>
                  Add Friend
                </button>
              </div>
            )
          }
        } else {
          return (
            <div>
              <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
                <i className="icon user"></i>
                Add Friend
              </button>
            </div>
          )
        }
      } else {
        return (
          <div>
            <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
              <i className="icon user"></i>
              Add Friend
            </button>
          </div>
        )
      }
    } else {
      return (
        <div>
          <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
            <i className="icon user"></i>
            Add Friend
          </button>
        </div>
      )
    }
  }


  //
  //   if (this.props.pendingFriends.length > 0) {
  //     if (this.props.pendingFriends.find(friend => friend.id == this.props.currentPageUserId)) {
  //       return (
  //         <div>
  //           <button className="ui basic button notFriendViewButton">
  //             <i className="icon user"></i>
  //             Friend Request Pending
  //           </button>
  //         </div>
  //       )
  //     } else if (this.props.requestedFriends.length > 0) {
  //       if (this.props.requestedFriends.find(friend => friend.id == this.props.currentPageUserId)) {
  //         return (
  //           <div>
  //             <button className="ui basic button notFriendViewButton" onClick={this.handleAcceptFriendRequest}>
  //               <i className="icon user"></i>
  //               Accept Friend Request
  //             </button>
  //           </div>
  //         )
  //       }
  //     } else {
  //       return (
  //         <div>
  //           <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
  //             <i className="icon user"></i>
  //             Add Friend
  //           </button>
  //         </div>
  //       )
  //     }
  //   } else if (this.props.requestedFriends.length > 0) {
  //     if (this.props.requestedFriends.find(friend => friend.id == this.props.currentPageUserId)) {
  //       return (
  //         <div>
  //           <button className="ui basic button notFriendViewButton" onClick={this.handleAcceptFriendRequest}>
  //             <i className="icon user"></i>
  //             Accept Friend Request
  //           </button>
  //         </div>
  //       )
  //     }
  //   } else {
  //     return (
  //       <div>
  //         <button className="ui basic button notFriendViewButton" onClick={this.handleAddFriend}>
  //           <i className="icon user"></i>
  //           Add Friend
  //         </button>
  //       </div>
  //     )
  //   }
  // }

  render() {
    return(
      <div>
        <h3>You are not friends with this user.</h3>
        {this.renderButton()}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    friends: state.friends,
    requestedFriends: state.requestedFriends,
    pendingFriends: state.pendingFriends
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendFriendRequest: SendFriendRequest,
    acceptFriendRequest: AcceptFriendRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(notFriendView)
