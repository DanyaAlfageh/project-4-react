import React, { Component } from 'react'
import { show } from './api'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class ShowImage extends Component {
    state = {
      image: {}
    }

    componentDidMount () {
      const user = this.props.user
      const imageId = this.props.imageId
      show(user, imageId)
        .then((response) => {
          const showImage = response.data.upload
          this.setState({
            image: showImage
          })
        })
        .catch((error) => console.log(error))
    }
    render () {
      return (
        <Container fluid className='center-image'>
          <Row>
            <Col><Link to='/display'>Back </Link></Col>
          </Row>
          <Row>
            <Col><img src={this.state.image.url} alt=""/></Col>
          </Row>
        </Container>
      )
    }
}

export default ShowImage
