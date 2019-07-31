import React, { Component } from 'react'
import { search } from './api'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

class SearchByTag extends Component {
    state={
      tag: '',
      result: []
    }
      handleChange = (event) => {
        const query = event.target.value
        if (query.length === 0) return ''
        this.setState({
          tag: query,
          result: []
        })
      }
      handleSubmit = (event) => {
        event.preventDefault()
        search(this.state.tag)
          .then((res) => {
            const request = res.data.uploads
            this.setState({
              tag: '',
              result: request
            })
          })
          .catch((err) => {
            console.log(err)
            alert('No result was found. Pleaase search again!')
            this.setState({
              tag: '',
              result: []
            })
          })
      }
      render () {
        return (
          <Card style={{ marginTop: '3rem', marginBottom: '3rem' }}><br /><br /><br /><br />
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col>
                    <Form.Control onChange={this.handleChange} type="text" name="title" placeholder='search by tag' value={this.state.tag}/>
                  </Col>
                  <Col>
                    <Button style={{ marginLeft: '.4rem' }} type='submit' variant="primary" >Search</Button>
                  </Col>
                </Row>
              </Form>
              <Container style={{ marginTop: '1rem' }}>
                <Row>
                  {!this.state.result ? <p></p>
                    : this.state.result.map((image, index) => (
                      <Image key={index} src={image.url} alt="no image" style={{ margin: '.5rem',
                        padding: '1rem',
                        width: '240px',
                        height: '240px' }}
                      thumbnail
                      onClick={() => window.open(image.url, '_blank')}
                      />
                    ))
                  }
                </Row>
              </Container>
            </Card.Body>
          </Card>
        )
      }
}

export default SearchByTag
