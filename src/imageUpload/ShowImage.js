import React, { Component } from 'react'
import { show, update } from './api'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'

// const cStyle = {
//   position: 'relative',
//   display: 'inline-block',
//   width: '300px',
//   border: '1px solid lightblue',
//   overflow: 'auto'
// }

const listStyle = {
  display: 'inline-block',
  color: 'blue',
  fontSize: '0.9em',
  margin: '5px',
  padding: '2px'
}

// const borderbox = {
//   border: '1px solid red'
// }

const iStyle = {
  display: 'inline-block',
  fontSize: '0.9em',
  borderRadius: '5px',
  margin: 'auto auto 50px 50px',
  padding: '9px',
  border: '1px solid rgb(208,208,208)'
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
        <Container style={{ margin: '3rem auto', border: '1px solid rgb(208,208,208)' }}>
          <Row>
            <Col md='4' style={{ borderRight: '1px solid rgb(208,208,208)', backgroundColor: 'grey' }}>
              <br />
              <Link to='/display'><Badge variant="primary">Back</Badge></Link>
              <br />
              <Image src={this.state.image.url} alt="" style={{ padding: '3rem', margin: '0 auto' }} fluid />
            </Col>
            <Col md='8'>
              <br /><br /><br />
              <div>
                <ul>
                  {this.state.tags.tag ? this.state.tags.tag.map((tag, index) =>
                    <li key={index} style={listStyle}>
                      <Link to={`/tag/${tag}`}>#{tag}</Link>
                    </li>
                  ) : <li>No Tags Yet !!!</li> }
                </ul>
                {!(this.props.user._id === this.state.image.owner) ? ''
                  : <div>{/* style={cStyle} */}
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
