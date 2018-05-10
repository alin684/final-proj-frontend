import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ClearUser from '../../actions/clearUser'
import ClearUsers from '../../actions/clearUsers'
import ClearPosts from '../../actions/clearPosts'

import GetUsers from '../../actions/getUsers'

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
      activeItem: 'profile',
      selectedUserId: null
    }
  }

  componentDidMount() {
    this.props.getUsers()
  }

  isLoggedIn = () => {
    return !!this.props.currentUser.id
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = () => {
    localStorage.clear()
    this.props.clearUser({})
    this.props.clearUsers({})
    this.props.clearPosts({})
    this.setState({ redirect: true })
  }

  // generateDropdownObject = () => {
  //   if (this.props.users.length > 0) {
  //     return this.props.users.map(user => ({
  //       key: user.id,
  //       value: user.id,
  //       text: user.first_name + " " + user.last_name
  //     }))
  //   }
  // }

  // const DropdownSearch = () => (
  //   <Dropdown
  //     placeholder='Select Friend'
  //     search selection options={this.generateDropdownObject()}
  //     onChange={this.handleSelect}
  //   />
  // )

  handleSelect = (event, data) => {
    this.setState({
      selectedUserId: data.value
    })
  }

  generateDropdownMenu = () => {
    if (this.props.users.length > 0) {
      let sortedUsers = this.props.users.sort(function(a,b) {
        let nameA = a.first_name.toLowerCase()
        let nameB = b.first_name.toLowerCase()
        if (nameA < nameB) {
          return -1
        } else if (nameA > nameB) {
          return 1
        } else {
          return 0
        }
      })
      return sortedUsers.map(user => {
        return (
          <Dropdown.Item key={user.id} value={user.id} text={user.first_name + " " + user.last_name} as={Link} to={'/users/' + user.id} />
        )
      })
    }
  }

  render() {

    const activeItem = this.state.activeItem

    return (
      <div>
        {this.state.redirect ? <Redirect to="/" /> : null }
        {this.state.selectedUserId ? <Redirect to="/" /> : null }
        {this.isLoggedIn() ?
          <Menu className="navBar" inverted fixed="top">
              <Dropdown item selection placeholder="Select User from list...">
                <Dropdown.Menu>
                  {this.generateDropdownMenu()}
                </Dropdown.Menu>
              </Dropdown>
            <Menu.Menu position='right'>
            <Menu.Item name='feed' as={Link} to='/feed' active={activeItem === 'feed'} onClick={this.handleItemClick} />
            <Menu.Item name='profile' as={Link} to='/' active={activeItem === 'profile'} onClick={this.handleItemClick} />
            <Menu.Item name='friends' as={Link} to='/friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
              <Menu.Item name='logout' onClick={this.handleLogout} />
            </Menu.Menu>
          </Menu> :
          <Menu className="navBar" fixed="top">
            <Menu.Menu position='right'>
              <Menu.Item className="cornerLogin" name='login' as={Link} to='/' />
            </Menu.Menu>
          </Menu>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    users: state.users
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearUser: ClearUser,
    clearUsers: ClearUsers,
    clearPosts: ClearPosts,
    getUsers: GetUsers
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
