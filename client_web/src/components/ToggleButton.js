import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import Flexbox from './Flexbox'

import buttonStyles from '../styles/buttonStyles'
import Colors from '../res/values/Colors'
import Fonts from '../res/values/Fonts'

const styles = {
  ToggleButton: {
    extend: 'Button',
    alignSelf: 'center', // TODO : use props.className instead

    border: '4px solid',
    borderColor: props => props.isActive ? Colors.green: Colors.red,
    cursor: 'default',
    margin: '30px 0',
    width: 336,
    backgroundColor: Colors.white
  },
  RoundSwitcher: {
    margin: '0 15px',
    cursor: 'pointer',
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: Colors.facebook // TODO :
  },
  ButtonText: {
    margin: '0 70px',
    alignSelf: 'center',
    font: 'normal 24px/normal ' + Fonts.roboto,
    color: props => props.textColor || ''
  }
}

const ToggleButton = (props) => {
  const { classes, isActive, text } = props

  return (
    <Flexbox
      className={classes.ToggleButton}
      spaceBetween>
      {!isActive && <div className={classes.RoundSwitcher} />}
      <div className={classes.ButtonText}>
        {text}
      </div>
      {isActive && <div className={classes.RoundSwitcher} />}
    </Flexbox>
  )
}

ToggleButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string
}

const StyledToggleButton = injectSheet({...styles, ...buttonStyles})(ToggleButton)

export default StyledToggleButton
