import React, { Component } from 'react'
import { index } from './api'

class ImagesDisplay extends Component {
    state ={
      images: []
    }

    componentDidMount () {
      index()
        .then(response => {
          this.setState({
            images: response.data.uploads
          })
          console.log(response)
        })
        .catch(err => console.log(err))
    }
    render () {
      return (
        <div>
          {this.state.images.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt='none' />
            </div>))
          }
        </div>
      )
    }
}

export default ImagesDisplay
