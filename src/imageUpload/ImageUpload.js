import React, { Component } from 'react'
import { upload } from './api'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
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
      <Container className='auth-form'>
        <Row className="justify-content-lg-center">
          <Form encType='multipart/form-data'>
            <Form.Group as={Row} controlId="ImageUpload">
              <Col sm="2">
                <Form.Label>Image</Form.Label>
              </Col>
              <Col sm="10">
                <input type="file"
                  name="image"
                  onChange={this.fileChangedHandler}/>
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.uploadHandler}>
          Upload
            </Button>
          </Form>
        </Row>
      </Container>
    )
  }
}

export default withRouter(ImageUpload)
