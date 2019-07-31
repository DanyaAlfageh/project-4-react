import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

import { Form, Button, Card, Col, Row } from 'react-bootstrap'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Card style={{ width: '70%',
        height: '90%',
        margin: '5% auto',
        padding: '.3rem' }}>
        <Card.Body style={{ marginTop: '5%' }}>
          <Form onSubmit={this.onSignIn}>
            <h3>Sign In</h3>
            <Row style={{ margin: '5%' }}>
              <Col sm='3'><Form.Label htmlFor="email">Email</Form.Label></Col>
              <Col sm='8'><Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              /><br /></Col></Row><Row style={{ margin: '5%' }}>
              <Col sm='3'><Form.Label htmlFor="password">Password</Form.Label></Col>
              <Col sm='8'><Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              /></Col></Row>
            <Button variant="primary" type="submit" style={{ display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: ' 3rem auto' }}> Sign In </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(SignIn)
