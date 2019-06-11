import React from 'react'
import injectSheet from 'react-jss'

import Alts from '../res/values/Alts'
import BottomLeftStain from '../res/drawable/Ellipse1.svg'
import TopRightStain from '../res/drawable/Ellipse4.svg'
import BottomRightStain from '../res/drawable/BigStain1.svg'

const styles = {
  BottomLeftStain: {
    zIndex: -1,
    position: 'absolute',
    left: -60,
    top: 676
  },
  TopRightStain: {
    zIndex: -1,
    position: 'absolute',
    left: 1720,
    top: 225
  },
  BottomRightStain: {
    zIndex: -1,
    position: 'absolute',
    left: 1680,
    top: 715
  }
}

function BlueStains (props) {
  const { classes } = props

  return (
    <React.Fragment>
      <img
        className={classes.BottomLeftStain}
        src={BottomLeftStain}
        alt={Alts.stain} />
      <img
        className={classes.TopRightStain}
        src={TopRightStain}
        alt={Alts.stain} />
      <img
        className={classes.BottomRightStain}
        src={BottomRightStain}
        alt={Alts.stain} />
    </React.Fragment>
  )
}

const StyledBlueStains = injectSheet(styles)(BlueStains)

export default StyledBlueStains
