import React, { Component } from 'react'
import { show } from './api'
import { Link } from 'react-router-dom'
import Tag from './Tags'

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
          <Tag user={this.props.user} imageId={this.props.imageId}/>
          <br /><br /><br />
          <Link to='/display'>Back </Link>
          <br /><br /><br />
          <ul>
            {this.state.image.tags ? this.state.image.tags.map((tag, index) =>
              <li key={index}>{tag.tag}</li>) : '0'}
          </ul>
          <br /><br /><br />
          <div>
            <img src={this.state.image.url} alt=""/>
          </div>
        </div>
      )
    }
}

export default ShowImage
