import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'

import Flexbox from './Flexbox'
import NavBar from './NavBar'
import ProviderApplet from './ProviderApplet'
import MixedStains from './MixedStains'
import AppletButton from './AppletButton'
import SideSpacer from './SideSpacer'

import FacebookIcon from '../res/drawable/facebook_icon.svg'
import InstagramIcon from '../res/drawable/instagram_icon.svg'
import LeftArrowIcon from '../res/drawable/left_arrow_icon.svg'
import Colors from '../res/values/Colors'
import Alts from '../res/values/Alts'
import Paths from '../res/values/Paths'

const styles = {
  '@global body': {
    overflowX: 'hidden'
  },
  PageContainer: {

  },
  ProviderAppletContainer: {
    alignSelf: 'center',

    marginTop: 60,
    marginBottom: 60
  },
  BackButton: {
    cursor: 'pointer',
    marginLeft: 289,
    marginTop: 382,
    position: 'fixed'
  }
}

class SubscribeList extends Component {
  render () {
    const { classes, history } = this.props

    return (
      <React.Fragment>
        <img
          className={classes.BackButton}
          src={LeftArrowIcon}
          alt={Alts.backIcon}
          onClick={() => history.push(Paths.dashboard)} />
        <Flexbox column>
          <NavBar />
          <Flexbox spaceBetween>
            <SideSpacer />
            <Flexbox column>
              <ProviderApplet
                className={classes.ProviderAppletContainer}
                src={FacebookIcon}
                bgColor={Colors.facebook} />
              <AppletButton // TODO : fetch
                title={'Share on Instagram'}
                description={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit ametv'}
                src={InstagramIcon}
                bgColor={Colors.facebook} />
            </Flexbox>
            <SideSpacer />
          </Flexbox>
        </Flexbox>
        <MixedStains />
      </React.Fragment>
    )
  }
}

const withRouterStyledSubscribeList = withRouter(injectSheet(styles)(SubscribeList))

export default withRouterStyledSubscribeList
