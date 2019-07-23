import React, { Component } from 'react'
import { show } from './api'
import { Link } from 'react-router-dom'

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
        <div>
          <Link to='/display'>Back </Link>
          <img src={this.state.image.url} alt=""/>
        </div>
      )
    }
}

export default ShowImage
