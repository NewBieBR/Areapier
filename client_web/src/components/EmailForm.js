import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { withSnackbar } from 'notistack'
import { withRouter } from 'react-router-dom'

import { connectUser, createUser } from '../services/Users/Requests'
import { setNewCookie } from '../helpers/cookies'

import buttonStyles from '../styles/buttonStyles'

import Texts from '../res/values/Texts'
import Names from '../res/values/Names'
import Colors from '../res/values/Colors'
import Fonts from '../res/values/Fonts'
import InputTypes from '../res/values/InputTypes'
import Flexbox from './Flexbox'
import Paths from '../res/values/Paths'
import Keys from '../res/values/Keys'
import Cookies from '../res/values/Cookies'

const styles = {
  Input: {
    margin: '25px 36px',
    paddingBottom: 5,
    width: 380,
    outline: 'none',
    font: 'normal 24px/normal ' + Fonts.roboto,
    border: 'none',
    borderBottom: Colors.silverChalice + ' 1px solid',

    '&:focus': { borderBottom: Colors.green + ' 1px solid' }
  },
  WrongInput: {
    '&:focus': { borderBottom: Colors.red + ' 1px solid' }
  },
  EmailInput: { marginBottom: 50 },
  ActionButtonsContainer: { margin: '36px' }
}

class EmailForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      emailValue: '',
      passwordValue: '',
      retypePasswordValue: '',
      passwordsMatch: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name + 'Value']: event.target.value
    })

    if (event.target.name === Names.retypePassword) {
      this.setState({
        passwordsMatch: event.target.value === this.state.passwordValue
      })
    }
  }

  async handleOnSubmit () {
    let createUserResponse

    if (!this.props.isLogin) { // Sign up
      if (this.state.passwordValue !== this.state.retypePasswordValue) {
        this.props.enqueueSnackbar(Texts.passwordMismatch, { variant: 'error' })
        return
      }
      createUserResponse = await createUser(this.state.emailValue, this.state.passwordValue, Keys.emailAuthType)

      this.props.enqueueSnackbar(createUserResponse.message, { variant: createUserResponse.snackbarVariant })
    }
    if (this.props.isLogin || createUserResponse.isSuccessful) {
      let connectUserResponse = await connectUser(this.state.emailValue, this.state.passwordValue, Keys.emailAuthType)

      this.props.enqueueSnackbar(connectUserResponse.message, { variant: connectUserResponse.snackbarVariant })
      if (connectUserResponse.isSuccessful) {
        setNewCookie(Cookies.userToken, connectUserResponse.data.token, connectUserResponse.data.expirationDate)
        setNewCookie(Cookies.username, this.state.emailValue, connectUserResponse.data.expirationDate)
        this.props.history.push(Paths.dashboard)
      }
    }
  }

  render () {
    const { classes } = this.props
    let submitTitle = this.props.isLogin ? Texts.login : Texts.signUp
    return (
      <React.Fragment>
        <input
          className={classes.Input + ' ' + classes.EmailInput}
          type={InputTypes.text}
          name={Names.email}
          placeholder={Texts.email}
          value={this.state.value}
          onChange={this.handleChange} />
        <input
          className={classes.Input}
          type={InputTypes.password}
          name={Names.password}
          placeholder={Texts.password}
          value={this.state.value}
          onChange={this.handleChange} />
        {!this.props.isLogin &&
        <input
          className={classes.Input + (this.state.passwordsMatch ? '' : ' ' + classes.WrongInput)}
          name={Names.retypePassword}
          placeholder={Texts.retypePassword}
          type={InputTypes.password}
          value={this.state.value}
          onChange={this.handleChange} />}
        <Flexbox spaceBetween className={classes.ActionButtonsContainer}>
          <button
            className={classes.Button + ' ' + classes.MediumEmphasisButton}
            onClick={this.props.cancelOnClick}
            type={InputTypes.button}>
            {Texts.cancel}
          </button>
          <button
            className={classes.Button + ' ' + classes.HighEmphasisButton}
            onClick={this.handleOnSubmit}
            type={InputTypes.button}>
            {submitTitle}
          </button>
        </Flexbox>
      </React.Fragment>
    )
  }
}

EmailForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  cancelOnClick: PropTypes.func.isRequired
}

const WithRouterWithSnackbarStyledEmailForm = withRouter(withSnackbar(injectSheet({ ...styles, ...buttonStyles })(EmailForm)))

export default WithRouterWithSnackbarStyledEmailForm
