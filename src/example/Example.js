import React, { Component } from 'react'
import { index } from './api'

class Example extends Component {
  state ={
    examples: []
  }

  componentDidMount () {
    index(this.props.user)
      .then(res => {
        this.setState({
          examples: res.data.examples
        })
        console.log(res)
      })
      .catch(err => console.log(err))
  }
  render () {
    return (
      <div>
        {this.state.examples.map((example, index) => (
          <div key={index}>
            <h2>Title: {example.title}</h2>
            <p> Text: {example.text}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Example
