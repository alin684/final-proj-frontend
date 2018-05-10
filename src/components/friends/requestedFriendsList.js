import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import AcceptFriendRequest from '../../actions/acceptFriendRequest'

class RequestedFriendsList extends React.Component {

  handleClick = (event) => {
    let acc_id = localStorage.getItem('id')
    let send_id = parseInt(event.target.id)
    let stat = {acceptor_id: acc_id, sender_id: send_id}
    this.props.acceptFriendRequest(stat)
  }

  renderList = () => {
    if (this.props.requestedFriends.length > 0) {
      return this.props.requestedFriends.map(friend => {
        return (
          <div className="tabContentItem" key={friend.id}>
            <div className="nameLink">
              <Link to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</Link>
            </div>
            <div className="insideTabButton">
              <button id={`${friend.id}`} className="ui basic button insideTab" onClick={this.handleClick}><i className="icon user"></i>Accept Friend Request</button>
            </div>
            <br />
          </div>
        )
      })
    }
  }

  render() {
    return(
      <div>
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    requestedFriends: state.requestedFriends
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    acceptFriendRequest: AcceptFriendRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestedFriendsList)
