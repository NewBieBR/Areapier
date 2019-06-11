import React from 'react'
import injectSheet from 'react-jss'

import TopLeftStain from '../res/drawable/BigStain3.svg'
import TopMiddleStain from '../res/drawable/BigStain4.svg'
import MiddleLeftStain from '../res/drawable/Ellipse3.svg'
import BottomRightStain from '../res/drawable/BigStain2.svg'
import Alts from '../res/values/Alts'

const styles = {
  TopLeftStain: {
    zIndex: -1,
    position: 'absolute',
    left: -50,
    top: 220
  },
  TopMiddleStain: {
    zIndex: -1,
    position: 'absolute',
    left: 911,
    top: 53
  },
  MiddleLeftStain: {
    zIndex: -1,
    position: 'absolute',
    left: -60,
    top: 1053
  },
  BottomRightStain: {
    zIndex: -1,
    position: 'absolute',
    left: 857,
    top: 618
  }
}

function MixedStains (props) {
  const { classes } = props

  return (
    <React.Fragment>
      <img
        className={classes.TopLeftStain}
        src={TopLeftStain}
        alt={Alts.stain} />
      <img
        className={classes.TopMiddleStain}
        src={TopMiddleStain}
        alt={Alts.stain} />
      <img
        className={classes.MiddleLeftStain}
        src={MiddleLeftStain}
        alt={Alts.stain} />
      <img
        className={classes.BottomRightStain}
        src={BottomRightStain}
        alt={Alts.stain} />
    </React.Fragment>
  )
}

const StyledBlueStains = injectSheet(styles)(MixedStains)

export default StyledBlueStains
