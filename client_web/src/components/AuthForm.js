import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import EmailForm from './EmailForm'
import ProvidersChoice from './ProvidersChoice'

import EmailIcon from '../res/drawable/email_icon.svg'
import Flexbox from './Flexbox'
import Fonts from '../res/values/Fonts'
import Alts from '../res/values/Alts'
import Texts from '../res/values/Texts'
import Colors from '../res/values/Colors'
import Providers from '../res/values/Providers'

const styles = {
  Title: {
    cursor: 'default',
    alignSelf: 'center',
    font: 'normal 48px/normal ' + Fonts.roboto,
    marginBottom: 25
  },
  ContentContainer: {
    alignSelf: 'center',
    zIndex: 1,
    border: Colors.doveGray + ' 1px solid',
    padding: '25px 0',
    boxShadow: Colors.mako + ' 0 3px 15px',
    backgroundColor: 'rgba(255, 255, 255, 0.79)'
  }
}

class AuthForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showEmailForm: false
    }
    this.toggleEmailForm = this.toggleEmailForm.bind(this)
  }

  toggleEmailForm () {
    this.setState({
      showEmailForm: !this.state.showEmailForm
    })
  }

  render () {
    const { classes, isLogin } = this.props
    let prefix = isLogin ? Texts.login : Texts.signUp

    return (
      <Flexbox
        column
        center>
        <Flexbox className={classes.Title}>
          {this.state.showEmailForm &&
          <img
            src={EmailIcon}
            alt={Alts.providerIcon} />}
          {prefix}{this.state.showEmailForm && (' ' + Texts.with + ' ' + Providers.email)}
        </Flexbox>
        <Flexbox
          className={classes.ContentContainer}
          column>
          {this.state.showEmailForm
            ? <EmailForm
              isLogin={isLogin}
              cancelOnClick={this.toggleEmailForm} />
            : <ProvidersChoice
              isLogin={isLogin}
              prefix={prefix}
              emailOnClick={this.toggleEmailForm} />}
        </Flexbox>
      </Flexbox>
    )
  }
}

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired
}

const StyledAuthForm = injectSheet(styles)(AuthForm)

export default StyledAuthForm
