import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import { lookForVarName } from '../helpers/converters'

const justifyContentProps = [
  'flexEnd',
  'spaceBetween',
  'spaceAround',
  'center'
]

const styles = {
  Flexbox: {
    display: 'flex',
    flexDirection: props => props.column ? 'column' : 'row',
    justifyContent: props => lookForVarName(props, justifyContentProps, 'flexStart')
  }
}

const Flexbox = ({ classes, children, className, onClick }) => {
  return (
    <div
      className={classes.Flexbox + ' ' + className}
      onClick={onClick}>
      {children}
    </div>
  )
}

Flexbox.propTypes = {
  column: PropTypes.bool
}

const StyledFlexbox = injectSheet(styles)(Flexbox)

export default StyledFlexbox
