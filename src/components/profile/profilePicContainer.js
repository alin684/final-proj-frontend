import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Dropzone from 'react-dropzone';
import request from 'superagent';

import SetProfilePic from '../../actions/setProfilePic'
import defaultPic from './defaultPic.jpg'

const CLOUDINARY_UPLOAD_PRESET = 'bookface_prof';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/alin684/image/upload';

class ProfilePicContainer extends React.Component {
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
          let stat = {id: this.props.currentPageUserId, profile_pic: response.body.secure_url}
          this.props.setProfilePic(stat)
        }
      });
    }
  }

  renderProfPic = () => {
    if (this.state.id == this.props.currentPageUserId) {
      if (this.props.users.length > 0) {
        let currentPageUser = this.props.users.find(user => user.id == this.props.currentPageUserId)
        let currentProfPic
        if (currentPageUser.profile_pic) {
          currentProfPic = currentPageUser.profile_pic
        } else {
          currentProfPic = defaultPic
        }
        return (
          <div className="profilePic">
            <Dropzone
              multiple={false}
              accept="image/*"
              style={{width: "200px"}, {height: "200px"}}
              onDrop={this.onImageDrop}>
              <img src={currentProfPic} />
            </Dropzone>
          </div>
        )
      } else {
        return (
          <div className="profilePic">
            <Dropzone
              multiple={false}
              accept="image/*"
              style={{width: "200px"}, {height: "200px"}}
              onDrop={this.onImageDrop}>
              <img src={defaultPic} />
            </Dropzone>
          </div>
        )
      }
    } else {
      if (this.props.users.length > 0) {
        let currentPageUser = this.props.users.find(user => user.id == this.props.currentPageUserId)
        let currentProfPic
        if (currentPageUser.profile_pic) {
          currentProfPic = currentPageUser.profile_pic
        } else {
          currentProfPic = defaultPic
        }
        return (
          <div className="profilePic">
            <img src={currentProfPic} />
          </div>
        )
      } else {
        return (
          <div className="profilePic">
            <img src={defaultPic} />
          </div>
        )
      }
    }
  }

  render() {

    return(
      <div>
        {this.renderProfPic()}
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
      setProfilePic: SetProfilePic
    }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicContainer)
