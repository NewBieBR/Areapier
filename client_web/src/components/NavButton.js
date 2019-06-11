import React from 'react'
import { withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'

import ButtonStyles from '../styles/buttonStyles'

const NavButton =
  withRouter(({ history, classes, label, to, className }) => (
    <button
      type='button'
      className={classes.Button + ' ' + className}
      onClick={() => { history.push(to) }}>
      {label}
    </button>
  ))

const StyledNavButton = injectSheet(ButtonStyles)(NavButton)

export default StyledNavButton
