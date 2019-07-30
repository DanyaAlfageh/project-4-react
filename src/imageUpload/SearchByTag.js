import React, { Component } from 'react'
import { search } from './api'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

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
          <Card style={{ marginTop: '3rem', marginBottom: '3rem' }}><br /><br /><br /><br />
            <Card.Body>
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type="text" name="title" placeholder='search by tag' />
                <button style={{ margin: '1rem' }} type='submit'>Search</button>
              </form>
              <Container><br /><br />
                <h1> you have got {this.state.result.length} results </h1>
                <br /><br />
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

export default SearchByTag
