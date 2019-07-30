import React, { Component } from 'react'
import { search } from './api'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
// import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class GroupByTag extends Component {
    state={
      result: []
    }
    componentDidMount () {
      const word = this.props.word
      search(word)
        .then((response) => {
          const images = response.data.uploads
          this.setState({
            result: images
          })
        })
        .catch((error) => console.log(error))
    }
    render () {
      return (
        <Card style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <Card.Header>
            #{this.props.word}
          </Card.Header>
          <Card.Body>
            <Container>
              <Row>
                {this.state.result.map((image, index) => (
                  <Image key={index} src={image.url} alt="no image" style={{ margin: '.5rem',
                    padding: '1rem',
                    width: '240px',
                    height: '240px' }}
                  thumbnail />
                ))
                }
              </Row>
            </Container>
          </Card.Body>
        </Card>
      )
    }
}

export default GroupByTag
