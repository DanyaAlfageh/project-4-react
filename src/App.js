import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Example from './example/Example'
import ShowExample from './example/ShowExample'
import CreateExample from './example/CreateExample'
import UpdateExample from './example/UpdateExample'
import AlertDismissible from './auth/components/AlertDismissible'
import ImageUpload from './imageUpload/ImageUpload'
import ImageDisplay from './imageUpload/ImagesDisplay'
import ShowImage from './imageUpload/ShowImage'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/examples' render={() => (
            <Example alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/examples/:id' render={(props) => (
            <ShowExample alert={this.alert} user={user} exampleId={props.match.params.id} />
          )} />
          <AuthenticatedRoute user={user} path='/examples/:id/edit' render={(props) => (
            <UpdateExample alert={this.alert} user={user} exampleId={props.match.params.id} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create' render={() => (
            <CreateExample alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/upload' render={() => (
            <ImageUpload alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/display' render={() => (
            <ImageDisplay alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/display/:id' render={(props) => (
            <ShowImage alert={this.alert} user={user} imageId={props.match.params.id} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
