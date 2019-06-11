import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  SideSpacer: { width: 140 }
}

const SideSpacer = ({ classes }) => {
  return (
    <div className={classes.SideSpacer} />
  )
}

const StyledSideSpacer = injectSheet(styles)(SideSpacer)

export default StyledSideSpacer
