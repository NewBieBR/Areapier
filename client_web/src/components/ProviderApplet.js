import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'

import Paths from '../res/values/Paths'
import Alts from '../res/values/Alts'
import Colors from '../res/values/Colors'

const styles = {
  ProviderApplet: {
    margin: 4,
    width: 250,
    height: 250,
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: props => props.bgColor,
    backgroundImage: props => props.empty && 'linear-gradient(' + Colors.grenadier + ', ' + Colors.vividTangerine + ')'
  },
  ProviderIcon: {
    alignSelf: 'center',
    width: 130,
    margin: 'auto'
  }
}

class ProviderApplet extends Component {
  render () {
    const { classes } = this.props
    let containerClassNames = classes.ProviderApplet + (this.props.className ? ' ' + this.props.className : '')

    return (
      <div
        className={containerClassNames}
        onClick={() => this.props.history.push(Paths.subscribeList)}>
        {!this.props.empty &&
        <img
          className={classes.ProviderIcon}
          src={this.props.src}
          alt={Alts.providerIcon} />}
      </div>
    )
  }
}

const withRouterStyledProviderApplet = withRouter(injectSheet(styles)(ProviderApplet))

export default withRouterStyledProviderApplet
