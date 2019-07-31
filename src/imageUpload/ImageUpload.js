import React, { Component } from 'react'
import { upload } from './api'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
// import Row from 'react-bootstrap/Row'
import { withRouter } from 'react-router-dom'

class ImageUpload extends Component {
  state = { selectedFile: null }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  uploadHandler = event => {
    event.preventDefault()
    const imageFile = new FormData()
    const user = this.props.user
    imageFile.append('image', this.state.selectedFile)
    console.log(imageFile)
    upload(imageFile, user)
      .then((res) => console.log('response ' + res))
      .then(() => this.props.history.push('/display'))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <Card style={{ width: '70%',
        height: '90%',
        margin: '3rem auto',
        padding: '.3rem' }}>
        <Card.Body>
          <Form encType='multipart/form-data' style={{ paddingTop: '7rem',
            paddingLeft: 'auto',
            paddingRight: 'auto',
            margin: 'auto' }}>
            <Form.Group controlId="ImageUpload">
              <Form.Label style={{ marginBottom: '2rem' }}><h2>Upload Image</h2></Form.Label><br />
              <Form.Control type="file"
                name="image"
                onChange={this.fileChangedHandler}
                style={{ marginBottom: '1rem', padding: '.4rem', border: '1px solid rgb(208,208,208)' }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.uploadHandler}>
              Upload
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(ImageUpload)
