import React from 'react'
import { connect } from 'react-redux'

class PhotoAlbumContainer extends React.Component {

  renderPhotoAlbums = () => {

    return (
      <div className="photoAlbumBox">
        Photo Album feature is currently unavailable.
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderPhotoAlbums()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(PhotoAlbumContainer)
