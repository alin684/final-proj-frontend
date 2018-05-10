import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PendingFriendsList extends React.Component {

  renderList = () => {
    if (this.props.pendingFriends.length > 0) {
      return this.props.pendingFriends.map(friend => <div className="tabContentItem" key={friend.id}><div className="nameLink"><Link to={`/users/${friend.id}`} >{friend.first_name} {friend.last_name}</Link></div><br /></div>)
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
    pendingFriends: state.pendingFriends
  }
}

export default connect(mapStateToProps, null)(PendingFriendsList)
