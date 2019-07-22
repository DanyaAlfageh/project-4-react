import React, { Component } from 'react'
import { upload } from './api'

class ImageUpload extends Component {
  state = { selectedFile: null }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  uploadHandler = () => {
    event.preventDefault()
    const imageFile = this.state.selectedFile
    console.log(imageFile)
    upload(imageFile)
      .then(() => alert('cretaed'))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <form>
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
