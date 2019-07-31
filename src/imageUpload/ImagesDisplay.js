import React, { Component } from 'react'
import { index, destroy } from './api'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import * as moment from 'moment'
import Badge from 'react-bootstrap/Badge'

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
    checkCount = (number) => {
      if (number === 0) return ' today'
      else if (number === 1) return ' 1 day ago'
      else return number + ' days ago'
    }
    render () {
      console.log(this.state.images)
      return (
        <Container style={{ width: '100vw', margin: 'auto' }}>
          <Row style={{ margin: '5% auto' }}>
            {this.state.images.map((image, index) => (
              <Card key={index} style={{ width: '20vw', height: '50vh', margin: '.5%' }}>
                <Card.Img variant="top" src={image.url} alt='none' style={{ height: '60%', width: '100%' }} />
                <Card.Body>
                  <Badge variant="primary" style={{ marginRight: '3px' }}><Link to={`/display/${image._id}`} style={{ color: 'white' }}>View</Link></Badge>
                  <Badge onClick={ () => this.destroyHandle(this.props.user, image._id)} variant="danger">Delete</Badge>
                </Card.Body>
                <Card.Footer style={{ height: '15%', width: '100%' }}>
                  <small style={{ height: '10%', width: '100%', position: 'absolute', bottom: '0' }} className="text-muted">created {this.checkCount((moment(moment() - moment(image.createdAt)).format('D')) - 1)}</small>
                  {/* <small className="text-muted"> updated {this.checkCount((moment(moment() - moment(image.updatedAt)).format('D')) - 1)}</small> */}
                </Card.Footer>
              </Card>
            ))
            }
          </Row>
        </Container>
      )
    }
}

export default ImagesDisplay
