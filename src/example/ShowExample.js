import React, { Component } from 'react'
import { show } from './api'

class ShowExample extends Component {
    state = {
      example: {}
    }

    componentDidMount () {
      const user = this.props.user
      const exampleId = this.props.exampleId
      show(user, exampleId)
        .then((response) => {
          const showExample = response.data.example
          this.setState({
            example: showExample
          })
        })
        .catch((error) => console.log(error))
    }
    render () {
      return (
        <div>
          <h1>{this.state.example.title}</h1>
          <img src={this.state.example.text} alt=""/>
        </div>
      )
    }
}

export default ShowExample
