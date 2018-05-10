import React from 'react'
import { connect } from 'react-redux'

class InfoContainer extends React.Component {


  renderInfo = () => {

    return (
      <div className="infoBox">
        Bio feature is currently unavailable.
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderInfo()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(InfoContainer)
