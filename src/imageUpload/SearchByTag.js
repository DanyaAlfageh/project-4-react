import React, { Component } from 'react'
import { search } from './api'

class SearchByTag extends Component {
    state={
      tag: '',
      result: []
    }
      handleChange = (event) => {
        const query = event.target.value
        if (query.length === 0) return ''
        this.setState({
          tag: query,
          result: []
        })
      }
      handleSubmit = (event) => {
        event.preventDefault()
        search(this.state.tag)
          .then((res) => {
            const request = res.data.uploads
            this.setState({
              tag: '',
              result: request
            })
          })
          .catch(err => console.log(err))
      }
      render () {
        return (
          <div><br /><br /><br /><br />
            <form onSubmit={this.handleSubmit}>
                Tag Name :
              <input onChange={this.handleChange} type="text" name="title" />
              <button type='submit'>Search</button>
            </form>
            <div>
              <h1> you hav got {this.state.result.length} results </h1>
              <br /><br /><br /><br />
              {this.state.result.map((image, index) => (
                <div key={index}>
                  <img src={image.url} alt="hey" />
                </div>
              ))
              }
            </div>
          </div>
        )
      }
}

export default SearchByTag
