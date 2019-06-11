import React from 'react'
import injectSheet from 'react-jss'

import NavBar from './NavBar'
import Flexbox from './Flexbox'
import MixedStains from './MixedStains'
import BlueStains from './BlueStains'

import Travelers from '../res/drawable/Travelers.svg'
import Alts from '../res/values/Alts'
import Texts from '../res/values/Texts'
import Fonts from '../res/values/Fonts'
import Colors from '../res/values/Colors'

const styles = {
  '@global body': {
    overflow: 'hidden'
  },
  Title: {
    margin: 30,
    alignSelf: 'center',

    font: 'normal 70px/normal ' + Fonts.roboto,
    WebkitBoxSizing: 'content-box',
    MozBoxSizing: 'content-box',
    boxSizing: 'content-box',
    border: 'none',
    color: Colors.twitter,
    OTextOverflow: 'ellipsis',
    textOverflow: 'ellipsis',
    textShadow: '4px 4px 6px ' + Colors.black
  }
}

function NotFound (props) {
  const { classes } = props

  return (
    <React.Fragment>
      <Flexbox column>
        <NavBar hideLogin hideSignUp />
        <div className={classes.Title}>
          {Texts.lostTitle}
        </div>
        <img
          src={Travelers}
          alt={Alts.travelers} />
      </Flexbox>
      <MixedStains />
      <BlueStains />
    </React.Fragment>
  )
}

const StyledNotFound = injectSheet(styles)(NotFound)

export default StyledNotFound
