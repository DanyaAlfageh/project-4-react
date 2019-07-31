import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

import { Form, Button, Card, Col, Row } from 'react-bootstrap'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <Card style={{ width: '70%',
        height: '90%',
        margin: '5% auto',
        position: 'absloute' }}>
        <Card.Body style={{ marginTop: '5%' }}>
          <Form onSubmit={this.onChangePassword}>
            <h3>Change Password</h3>
            <Row style={{ margin: '5%' }}>
              <Col sm='3'><Form.Label htmlFor="oldpw">Old Password</Form.Label></Col>
              <Col sm='8'><Form.Control
                required
                name="oldPassword"
                value={oldPassword}
                type="password"
                placeholder="Old Password"
                onChange={this.handleChange}
              /></Col></Row>
            <Row style={{ margin: '5%' }}>
              <Col sm='3'><Form.Label htmlFor="newPassword">New Password</Form.Label></Col>
              <Col sm='8'><Form.Control
                required
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder="New Password"
                onChange={this.handleChange}
              /></Col></Row>
            <Button variant="primary" type="submit" style={{ display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              margin: ' 3rem auto' }}>Change Password</Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(ChangePassword)
