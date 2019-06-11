import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import Flexbox from './Flexbox'

import Fonts from '../res/values/Fonts'

const styles = {
  AuthButton: {
    margin: '25px 36px',
    width: 380,
    height: 80,

    cursor: 'pointer',
    borderRadius: 10,
    color: props => props.color,
    backgroundColor: props => props.bgColor,
    border: props => props.border
  },
  ButtonIcon: { margin: '23px 25px' },
  ButtonText: {
    alignSelf: 'center',
    font: 'normal 24px/normal ' + Fonts.roboto
  }
}

class AuthButton extends Component {
  render () {
    const { classes } = this.props
    let { prefix, provider, src, alt } = this.props

    return (
      <Flexbox
        className={classes.AuthButton}
        onClick={this.props.handleOnClick}>
        <img
          className={classes.ButtonIcon}
          src={src}
          alt={alt} />
        <div className={classes.ButtonText}>
          {prefix} with {provider}
        </div>
      </Flexbox>
    )
  }
}

AuthButton.propTypes = {
  prefix: PropTypes.string.isRequired
}

AuthButton.defaultProps = {
  handleOnClick: null,
  color: 'white',
  border: 'none'
}

const StyledAuthButton = injectSheet(styles)(AuthButton)

export default StyledAuthButton
