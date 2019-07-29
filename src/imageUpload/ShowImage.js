import React, { Component } from 'react'
import { show } from './api'
import { Link } from 'react-router-dom'
import Tag from './Tags'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

const listStyle = {
  'display': 'inline-block'
}

const borderbox = {
  border: '1px solid red'
}

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
        <Container style={{ marginTop: '3rem' }}>
          <Row className={borderbox} >
            <Col>
              <br />
              <Link to='/display'>Back </Link>
              <br />
              <Image src={this.state.image.url} alt="" style={{ padding: '3rem' }} fluid />
            </Col>
            <Col>
              <br /><br /><br />
              <div>
                <ul>
                  {this.state.image.tags ? this.state.image.tags.map((tag, index) =>
                    <li key={index} style={listStyle}>#{tag.tag}</li>) : ' ' }
                </ul>
                <Tag user={this.props.user} imageId={this.props.imageId}/>
              </div>
            </Col>
          </Row>
        </Container>
      )
    }
}

export default ShowImage
