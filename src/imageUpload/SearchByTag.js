import React, { Component } from 'react'
import { search } from './api'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const frame = {
  display: 'flex',
  justifyContent: 'center'
}

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
          .catch(err => console.log(err))
      }
      render () {
        return (
          <div style={{ marginTop: '3rem' }}>
            <Card><br /><br /><br /><br />
              <Card.Body>
                <form onSubmit={this.handleSubmit}>
                Tag Name :
                  <input onChange={this.handleChange} type="text" name="title" />
                  <button type='submit'>Search</button>
                </form>
                <Container><br /><br /><br /><br />
                  <h1> you hav got {this.state.result.length} results </h1>
                  <br /><br /><br /><br />
                  <Row>
                    {this.state.result.map((image, index) => (
                      <Col key={index} className={frame}>
                        <Image src={image.url} alt="no image" style={{ padding: '3rem' }} thumbnail />
                      </Col>
                    ))
                    }
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </div>
        )
      }
}

export default SearchByTag
