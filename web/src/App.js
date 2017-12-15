import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Error from './components/Error'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import PrimaryNav from './components/PrimaryNav'
import { signUp, signIn, signOutNow } from './api/auth'
import { setToken } from './api/init'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    error: null,
    decodedToken: getDecodedToken() // Restore previous sign in data
  }

  // User 
  onSignUp = ({ firstName, lastName, email, password }) => {
    signUp({ firstName, lastName, email, password })
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken, error } = this.state
    const signedIn = !!decodedToken

    const requireAuth = (render) => (props) => (
      (!signedIn) ? (
        <Redirect to='/signin' />
      ) : (
          render(props)
        )
    )

    return (
      <Router>
        <div className="App">

          {/* Primary navigation */}
          <PrimaryNav
            signedIn={signedIn}
            onSignOut={this.onSignOut}
          />

          {/* Display error */}
          {
            error && <Error error={error} />
          }

          {/* Main */}
          <Switch>
            <Route path='/' exact render={() => (
              <Fragment>
                <h1>Hello World</h1>
              </Fragment>
            )} />

            {/* Signin */}
            <Route path='/signin' exact render={() => (
              signedIn ? (
                <Redirect to='/' />
              ) : (
                  <Fragment>
                    <SignInForm
                      onSignIn={this.onSignIn}
                    />
                    <br />
                    <p>Don't have an account?</p>
                    <Link to='/signup'
                      className='btn btn-primary'
                    >
                      Sign Up
                          </Link>
                  </Fragment>
                )
            )} />

            {/* Sign up */}
            <Route path='/signup' exact render={() => (
              <Fragment>
                <SignUpForm
                  onSignUp={this.onSignUp}
                />
                <br />
                <Link to='/signin'
                  className='btn btn-primary'
                >
                  Back to Sign in
                      </Link>
              </Fragment>
            )} />

            {/* If route hasn't been found */}
            <Route render={({ location }) => (
              <h2>Page not found: {location.pathname}</h2>
            )} />
          </Switch>
        </div>
      </Router>
    )
  }

  load() {
    const saveError = (error) => {
      this.setState({ error })
    }

    // Load for everyone
    // TODO

    const { decodedToken } = this.state
    const signedIn = !!decodedToken

    if (signedIn) {
      // Load only for signed in users
    }
    else {
      // Clear sign-in-only data
    }
  }

  // When this App first appears on screen
  componentDidMount() {
    this.load()
  }

  // When state changes
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load()
    }
  }
}

export default App;