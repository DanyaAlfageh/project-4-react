import React, { Component } from 'react'
import { create } from './api'
import { withRouter } from 'react-router-dom'

class CreateExample extends Component {
    state={
      formData: {
        title: '',
        text: ''
      }
    }
    handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      const newForm = Object.assign(this.state.formData)
      newForm[name] = value
      this.setState({
        formData: newForm
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      const newExample = this.state.formData
      const user = this.props.user
      create(user, newExample)
        .then(() => alert('cretaed'))
        .then(() => this.props.history.push('/examples'))
        .catch(err => console.log(err))
    }

    render () {
      return (
        <form onSubmit={this.handleSubmit}>
          Title
          <input onChange={this.handleChange} type="text" name="title" value={this.state.formData.title} />
          Text
          <input onChange={this.handleChange} type="text" name="text" value={this.state.formData.text} />
          <button type='submit'>Create</button>
        </form>
      )
    }
}

export default withRouter(CreateExample)
