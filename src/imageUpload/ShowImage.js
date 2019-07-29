import React, { Component } from 'react'
import { show } from './api'
import { Link } from 'react-router-dom'
import Tag from './Tags'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const listStyle = {
  'display': 'inline-block'
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
        <Container className='center-content'>
          <Row>
            <Col xs lg="2">
              <br /><br /><br />
              <Link to='/display'>Back </Link>
              <br /><br /><br />
              <img src={this.state.image.url} alt=""/>
            </Col>
            <Col>
              <br /><br /><br />
              <span>
                <Tag user={this.props.user} imageId={this.props.imageId}/>
                <ul style={listStyle}>
                  {this.state.image.tags ? this.state.image.tags.map((tag, index) =>
                    <li key={index} style={listStyle}>#{tag.tag}</li>) : 0 }
                </ul>
              </span>
            </Col>
          </Row>
        </Container>
      )
    }
}

export default ShowImage
