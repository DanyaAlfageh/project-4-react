import React, { Component } from 'react'

const tagStyle = {
  display: 'inline-block',
  backgroundColor: 'yellow',
  fontSize: '0.9em',
  margin: '5px',
  border: '1px solid lightblue',
  padding: '2px'
}

class OneTag extends Component {
  render () {
    const tag = (
      <span style={tagStyle}>
        {this.props.value}
      </span>
    )
    return (
      <React.Fragment>
        { tag }
      </React.Fragment>
    )
  }
}

export default OneTag
