import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

import { Form, Button, Card, Col, Row } from 'react-bootstrap'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <Card style={{ width: '70%',
        height: '90%',
        margin: '5% auto',
        position: 'absloute' }}>
        <Card.Body style={{ marginTop: '5%' }}>
          <Form onSubmit={this.onSignUp}>
            <h3>Sign Up</h3>
            <Row style={{ margin: '5%' }}>
              <Col sm='3'><Form.Label htmlFor="email">Email</Form.Label></Col>
              <Col sm='8'><Form.Control
                required
                name="email"
                value={email}
                type="email"
                placeholder="Email"
                onChange={this.handleChange}
              /></Col></Row>
            <Row style={{ margin: '5%' }}>
              <Col sm='3'><Form.Label htmlFor="password">Password</Form.Label></Col>
              <Col sm='8'><Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              /><br /></Col></Row>
            <Row style={{ margin: '5%' }}>
              <Col sm='3'><Form.Label htmlFor="passwordConfirmation">Confirm Password</Form.Label></Col>
              <Col sm='8'><Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              /></Col></Row>
            <Button variant="primary" type="submit" style={{ display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              margin: ' 3rem auto' }}>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(SignUp)
