import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login'
import { withSnackbar } from 'notistack'
import { withRouter } from 'react-router-dom'

import AuthButton from './AuthButton'

import EmailIcon from '../res/drawable/email_icon.svg'
import FacebookIcon from '../res/drawable/facebook_icon.svg'
import GoogleIcon from '../res/drawable/google_icon.svg'
import TwitterIcon from '../res/drawable/twitter_icon.svg'
import PropTypes from 'prop-types'
import { connectUser, createUser } from '../services/Users/Requests'
import Keys from '../res/values/Keys'
import { setNewCookie } from '../helpers/cookies'
import Cookies from '../res/values/Cookies'
import Paths from '../res/values/Paths'

// TODO : Dynamic styles and providers

class ProvidersChoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      facebookResponse: undefined
    }
    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  async handleFacebookOnClick () {
    let createUserResponse

    if (!this.props.isLogin) { // Sign up
      createUserResponse = await createUser(
        this.state.facebookResponse.name,
        null,
        Keys.facebookAuthType,
        this.state.facebookResponse.accessToken,
        this.state.facebookResponse.userID)

      this.props.enqueueSnackbar(createUserResponse.message, { variant: createUserResponse.snackbarVariant })
    }
    if (this.props.isLogin || createUserResponse.isSuccessful) {
      let connectUserResponse = await connectUser(
        this.state.facebookResponse.name,
        null,
        Keys.facebookAuthType,
        this.state.facebookResponse.accessToken,
        this.state.facebookResponse.userID)

      this.props.enqueueSnackbar(connectUserResponse.message, { variant: connectUserResponse.snackbarVariant })
      if (connectUserResponse.isSuccessful) {
        setNewCookie(Cookies.userToken, connectUserResponse.data.token, connectUserResponse.data.expirationDate)
        setNewCookie(Cookies.username, this.state.facebookResponse.name, connectUserResponse.data.expirationDate)
        this.props.history.push(Paths.dashboard)
      }
    }
  }

  responseFacebook (response) {
    if (response.userID) {
      this.setState({
        facebookResponse: response
      }, this.handleFacebookOnClick)
    }
  }

  async handleGoogleOnClick () {
    let createUserResponse

    if (!this.props.isLogin) { // Sign up
      createUserResponse = await createUser(
        this.state.googleResponse.profileObj.name,
        null,
        Keys.googleAuthType,
        this.state.googleResponse.accessToken,
        this.state.googleResponse.googleId)

      this.props.enqueueSnackbar(createUserResponse.message, { variant: createUserResponse.snackbarVariant })
    }
    if (this.props.isLogin || createUserResponse.isSuccessful) {
      let connectUserResponse = await connectUser(
        this.state.googleResponse.profileObj.name,
        null,
        Keys.googleAuthType,
        this.state.googleResponse.accessToken,
        this.state.googleResponse.googleId)

      this.props.enqueueSnackbar(connectUserResponse.message, { variant: connectUserResponse.snackbarVariant })
      if (connectUserResponse.isSuccessful) {
        setNewCookie(Cookies.userToken, connectUserResponse.data.token, connectUserResponse.data.expirationDate)
        setNewCookie(Cookies.username, this.state.googleResponse.profileObj.name, connectUserResponse.data.expirationDate)
        this.props.history.push(Paths.dashboard)
      }
    }
  }

  responseGoogle (response) {
    if (response.error) {
      /* this.props.enqueueSnackbar(response.error, { variant: 'error' }) */ // Errors aren't user oriented
    } else {
      this.setState({
        googleResponse: response
      }, this.handleGoogleOnClick)
    }
  }

  render () {
    return (
      <React.Fragment>
        <AuthButton
          prefix={this.props.prefix}
          handleOnClick={this.props.emailOnClick}
          provider={'Email'}
          color={'rgba (0, 0, 0, 0.87)'}
          bgColor={'white'}
          border={'black 1px solid'}
          src={EmailIcon}
          alt={'email icon'} />
        <FacebookLogin
          appId='2063862280361420'
          callback={this.responseFacebook}
          render={renderProps => (
            <AuthButton
              prefix={this.props.prefix}
              provider={'Facebook'}
              bgColor={'#3B5998'}
              src={FacebookIcon}
              alt={'facebook icon'}
              handleOnClick={renderProps.onClick} />
          )}
        />
        {/*<AuthButton
        prefix={this.props.prefix}
        provider={'Facebook'}
        bgColor={'#3B5998'}
        src={FacebookIcon}
        alt={'facebook icon'} />*/}
        <GoogleLogin
          clientId='45488678106-6rs3kp173qp91mgthu3fq4igo35hcij2.apps.googleusercontent.com'
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          render={renderProps => (
            <AuthButton
              prefix={this.props.prefix}
              provider={'Google'}
              bgColor={'#DD4B39'}
              src={GoogleIcon}
              alt={'google icon'}
              handleOnClick={renderProps.onClick} />
          )}
        />,
        {/*<AuthButton
          prefix={this.props.prefix}
          provider={'Google'}
          bgColor={'#DD4B39'}
          src={GoogleIcon}
          alt={'google icon'} />*/}
        <AuthButton
          prefix={this.props.prefix}
          provider={'Twitter'}
          bgColor={'#55ACEE'}
          src={TwitterIcon}
          alt={'twitter con'} />
      </React.Fragment>
    )
  }
}

ProvidersChoice.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  prefix: PropTypes.string.isRequired,
  emailOnClick: PropTypes.func
}

const WithRouterWithSnackbarProvidersChoice = withRouter(withSnackbar(ProvidersChoice))

export default WithRouterWithSnackbarProvidersChoice
