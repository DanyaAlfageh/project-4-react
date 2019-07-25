import React, { Component } from 'react'
import OneTag from './OneTag'
import { update } from './api'
const cStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '300px',
  border: '1px solid lightblue',
  overflow: 'auto'
}

const iStyle = {
  display: 'inline-block',
  fontSize: '0.9em',
  margin: '5px',
  width: '90%',
  border: '0'
}

class Tags extends Component {
    state={
      tags: []
    }
    onKeyUp = (e) => {
      // Space is 32 and Enter is 13
      if (e.which === 32 || e.which === 13) {
        const input = e.target.value.trim().split(' ')
        update(this.props.user, input, this.props.imageId)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        if (input.length === 0 || input[0] === '') return ''
        this.setState({
          tags: [...this.state.tags, input]
        })
        e.target.value = ''
      }
    }
    render () {
      const tags = this.state.tags.map((tag, index) => { return <OneTag key={index} value={tag} /> })
      return (
        <div style={cStyle}>
          {tags}
          <input style={iStyle}
            onKeyUp={(e) => this.onKeyUp(e)}
            type='text' placeholder='hi'/>
        </div>
      )
    }
}

export default Tags
