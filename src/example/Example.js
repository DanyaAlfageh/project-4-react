import React, { Component } from 'react'
import { index, destroy } from './api'
import { Link } from 'react-router-dom'

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
  destroyHandle = (user, id) => {
    destroy(user, id)
      .then(() => alert('deleted'))
      .then(() => {
        const newExamples = this.state.examples.filter(
          example => example._id !== id
        )
        this.setState({ examples: newExamples })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div>
        {this.state.examples.map((example, index) => (
          <div key={index}>
            <Link to={`/examples/${example._id}`}><h1>{example.title}</h1></Link>
            <h2>Title: {example.title}</h2>
            <img src={example.text} alt="text" />
            <button onClick={ () => this.destroyHandle(this.props.user, example._id)}>Delete</button>
            <Link to={`/examples/${example._id}/edit`}><button>Edit</button></Link>
          </div>
        ))}
      </div>
    )
  }
}

export default Example
