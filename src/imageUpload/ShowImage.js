import React, { Component } from 'react'
import { show, update } from './api'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

const cStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '300px',
  border: '1px solid lightblue',
  overflow: 'auto'
}

const listStyle = {
  display: 'inline-block',
  color: 'blue',
  fontSize: '0.9em',
  margin: '5px',
  padding: '2px'
}

const borderbox = {
  border: '1px solid red'
}

const iStyle = {
  display: 'inline-block',
  fontSize: '0.9em',
  margin: '5px',
  width: '90%',
  border: '0'
}

class ShowImage extends Component {
    state = {
      image: {},
      tags: {
        tag: []
      }
    }

    componentDidMount () {
      const user = this.props.user
      const imageId = this.props.imageId
      show(user, imageId)
        .then((response) => {
          console.log(response.data.upload.tags)
          const arr = response.data.upload.tags.map(tag => tag.tag)
          const showImage = response.data.upload
          this.setState({
            image: showImage,
            tags: {
              tag: arr
            }
          })
        })
        .catch((error) => console.log(error))
    }
    onKeyUp = (e) => {
      if (e.which === 32 || e.which === 13) {
        const input = e.target.value.trim().split(' ')
        update(this.props.user, input, this.props.imageId)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        if (input.length === 0 || input[0] === '') return ''
        this.setState({
          tags: { tag: [...this.state.tags.tag, input] }
        })
        e.target.value = ''
      }
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
                  {this.state.tags.tag ? this.state.tags.tag.map((tag, index) =>
                    <li key={index} style={listStyle}>
                      <Link to={`/tag/${tag}`}>#{tag}</Link>
                    </li>
                  ) : ' ' }
                </ul>
                {!(this.props.user._id === this.state.image.owner) ? ''
                  : <div style={cStyle}>
                    <input style={iStyle}
                      onKeyUp={(e) => this.onKeyUp(e)}
                      type='text' placeholder='Add a new tag'/>
                  </div>}
              </div>
            </Col>
          </Row>
        </Container>
      )
    }
}

export default ShowImage
