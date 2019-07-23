import React, { Component } from 'react'
import { index, destroy } from './api'
import { Link } from 'react-router-dom'

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
      return (
        <div>
          {this.state.images.map((image, index) => (
            <div key={index}>
              <Link to={`/display/${image._id}`}>
                <img src={image.url} alt='none' />
              </Link>
              <button onClick={ () => this.destroyHandle(this.props.user, image._id)}>Delete</button>
            </div>))
          }
        </div>
      )
    }
}

export default ImagesDisplay
