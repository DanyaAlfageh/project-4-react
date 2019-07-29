import React, { Component } from 'react'
import { index, destroy } from './api'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import * as moment from 'moment'

class ImagesDisplay extends Component {
    state ={
      images: []
    }

    componentDidMount () {
      index(this.props.user)
        .then(response => {
          this.setState({
            images: response.data.uploads
          })
          console.log(response)
        })
        .catch(err => console.log(err))
    }
    destroyHandle = (user, id) => {
      destroy(user, id)
        .then(() => alert('deleted'))
        .then(() => {
          const newImages = this.state.images.filter(
            image => image._id !== id
          )
          this.setState({ images: newImages })
        })
        .catch(err => console.log(err))
    }
    render () {
      console.log(this.state.images)
      return (
        <Container fluid className='center-content'>
          <Row>
            {this.state.images.map((image, index) => (
              <Col xs lg="2" key={index} className="carspadds">
                <Card style={{ width: '13rem' }}>
                  <Card.Img variant="top" src={image.url} alt='none' />
                  <Card.Body>
                    <Link to={`/display/${image._id}`}>
                      <Card.Title>View Image</Card.Title>
                    </Link>
                    <button onClick={ () => this.destroyHandle(this.props.user, image._id)}>Delete</button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">created: {moment(image.createdAt).format('DD/MM/YYYY')}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))
            }
          </Row>
        </Container>
      )
    }
}

export default ImagesDisplay
