import React from 'react'
import injectSheet from 'react-jss'

import NavBar from './NavBar'
import NavButton from './NavButton'
import SideSpacer from './SideSpacer'
import Flexbox from './Flexbox'

import buttonStyles from '../styles/buttonStyles'
import SittingGirl from '../res/drawable/sitting_girl.svg'
import BottomLeftStain from '../res/drawable/Ellipse1.svg'
import Paths from '../res/values/Paths'
import Fonts from '../res/values/Fonts'
import Colors from '../res/values/Colors'
import Texts from '../res/values/Texts'
import Alts from '../res/values/Alts'

const styles = {
  PageContainer: { height: '100vh' },
  MiddleContainer: { flexGrow: 1 },
  TextContainer: { width: 500 },
  GetStartedTitle: {
    marginTop: -200,
    alignSelf: 'center',
    width: 400,
    font: 'normal 44px/normal ' + Fonts.roboto
  },
  GetStartedBody: {
    alignSelf: 'center',
    margin: '30px 0 30px 100px',
    font: 'normal 18px/normal ' + Fonts.roboto,
    color: Colors.doveGray
  },
  GetStartedButton: { alignSelf: 'center' },
  SittingGirl: { marginBottom: '10px' },
  BottomLeftStain: {
    position: 'absolute',
    left: '-60px',
    top: '676px'
  }
}

const Home = (props) => {
  const { classes } = props

  return (
    <Flexbox
      className={classes.PageContainer}
      column
      spaceBetween>
      <NavBar />
      <Flexbox>
        <SideSpacer />
        <Flexbox
          className={classes.MiddleContainer}
          spaceBetween>
          <Flexbox
            className={classes.TextContainer}
            column
            center>
            <div className={classes.GetStartedTitle}>
              {Texts.getStartedTitle}
            </div>
            <div className={classes.GetStartedBody}>
              {Texts.getStartedBody}
            </div>
            <NavButton
              className={classes.HighEmphasisButton + ' ' + classes.GetStartedButton}
              label={Texts.getStarted}
              to={Paths.dashboard} />
          </Flexbox>
          <img
            className={classes.SittingGirl}
            src={SittingGirl}
            alt={Alts.sittingGirl} />
        </Flexbox>
        <SideSpacer />
      </Flexbox>
      <img
        className={classes.BottomLeftStain}
        src={BottomLeftStain}
        alt={Alts.stain} />
    </Flexbox>
  )
}

const StyledHome = injectSheet({ ...styles, ...buttonStyles })(Home)

export default StyledHome
