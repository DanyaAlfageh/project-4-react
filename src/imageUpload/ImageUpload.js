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
      <Card style={{ width: '30rem',
        height: '30rem',
        marginTop: '3rem',
        padding: '.3rem',
        marginBottom: '0',
        marginRight: 'auto',
        marginLeft: 'auto' }}>
        <Card.Body>
          <Form encType='multipart/form-data' style={{ paddingTop: '10rem',
            paddingLeft: '1rem',
            paddingRight: '1rem' }}>
            <Form.Group controlId="ImageUpload">
              <Form.Label>Image</Form.Label>
              <input type="file"
                name="image"
                onChange={this.fileChangedHandler}
                style={{ border: '1px solid grey', padding: '5px' }}
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
