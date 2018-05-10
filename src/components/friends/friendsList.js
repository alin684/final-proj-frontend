import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import RemoveFriend from '../../actions/removeFriend'
import GetFriendsList from '../../actions/getFriendsList'

class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('id')
    }
  }

  componentDidMount() {
    this.props.getFriendsList(this.state)
  }

  handleClick = (event) => {
    let remvr_id = localStorage.getItem('id')
    let remvd_id = parseInt(event.target.id)
    let stat = {remover_id: remvr_id, removed_id: remvd_id}
    this.props.removeFriend(stat)
  }

  renderList = () => {
    if (this.props.friends.length > 0) {
      return this.props.friends.map(friend => {
        return (
          <div className="tabContentItem" key={friend.id}>
            <div className="nameLink">
              <Link to={`/users/${friend.id}`}>{friend.first_name} {friend.last_name}</Link>
            </div>
            <div className="insideTabButton">
              <button id={`${friend.id}`} className="ui basic button insideTab" onClick={this.handleClick}><i className="icon user"></i>Remove Friend</button>
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
    friends: state.friends
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeFriend: RemoveFriend,
    getFriendsList: GetFriendsList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
