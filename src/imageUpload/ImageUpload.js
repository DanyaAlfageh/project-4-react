import React, { Component } from 'react'
import { upload } from './api'

class ImageUpload extends Component {
  state = { selectedFile: null }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  uploadHandler = event => {
    event.preventDefault()
    const imageFile = new FormData()
    imageFile.append('image', this.state.selectedFile)
    console.log(imageFile)
    upload(imageFile)
      .then((res) => console.log('response ' + res))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <form encType='multipart/form-data'>
            Image
        <input type="file"
          name="image"
          onChange={this.fileChangedHandler}/>
        <button type='submit' onClick={this.uploadHandler}>Upload</button>
      </form>
    )
  }
}

export default ImageUpload
