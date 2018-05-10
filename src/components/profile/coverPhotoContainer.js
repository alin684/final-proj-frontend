import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Dropzone from 'react-dropzone';
import request from 'superagent';

import SetCoverPhoto from '../../actions/setCoverPhoto'
import defaultCover from './defaultCover.jpg'

const CLOUDINARY_UPLOAD_PRESET = 'bookface_cover';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/alin684/image/upload';

class CoverPhotoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('id')
    }
  }

  onImageDrop = (files) => {
    let new_img = files[0]
    this.handleImageUpload(new_img);
  }

  handleImageUpload = (file) => {
    if (file) {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
        if (response.body.secure_url !== '') {
          let stat = {id: this.props.currentPageUserId, cover_photo: response.body.secure_url}
          this.props.setCoverPhoto(stat)
        }
      });
    }
  }

  renderCoverPhoto = () => {
    if (this.state.id == this.props.currentPageUserId) {
      if (this.props.users.length > 0) {
        let currentPageUser = this.props.users.find(user => user.id == this.props.currentPageUserId)
        let currentCoverPhoto
        if (currentPageUser.cover_photo) {
          currentCoverPhoto = currentPageUser.cover_photo
        } else {
          currentCoverPhoto = defaultCover
        }
        return (
          <div className="coverPhoto">
            <Dropzone
              multiple={false}
              accept="image/*"
              style={{width: "851px"}, {height: "315px"}}
              onDrop={this.onImageDrop}>
              <img src={currentCoverPhoto} />
            </Dropzone>
          </div>
        )
      } else {
        return (
          <div className="coverPhoto">
            <Dropzone
              multiple={false}
              accept="image/*"
              style={{width: "851px"}, {height: "315px"}}
              onDrop={this.onImageDrop}>
              <img src={defaultCover} />
            </Dropzone>
          </div>
        )
      }
    } else {
      if (this.props.users.length > 0) {
        let currentPageUser = this.props.users.find(user => user.id == this.props.currentPageUserId)
        let currentCoverPhoto
        if (currentPageUser.cover_photo) {
          currentCoverPhoto = currentPageUser.cover_photo
        } else {
          currentCoverPhoto = defaultCover
        }
        return (
          <div className="coverPhoto">
            <img src={currentCoverPhoto} />
          </div>
        )
      } else {
        return (
          <div className="coverPhoto">
            <img src={defaultCover} />
          </div>
        )
      }
    }
  }

  render() {

    return(
      <div className="coverBar">
        {this.renderCoverPhoto()}
      </div>
    )
  }
}

  function mapStateToProps(state) {
    return {
      users: state.users
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setCoverPhoto: SetCoverPhoto
    }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(CoverPhotoContainer)
