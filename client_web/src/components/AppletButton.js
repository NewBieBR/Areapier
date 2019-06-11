import React, { Component } from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import ToggleButton from './ToggleButton'
import Flexbox from './Flexbox'

import buttonStyles from '../styles/buttonStyles'
import DownArrowIcon from '../res/drawable/down_arrow_icon.svg'
import UpArrowIcon from '../res/drawable/up_arrow_icon.svg'
import Colors from '../res/values/Colors'
import Fonts from '../res/values/Fonts'
import Alts from '../res/values/Alts'
import Texts from '../res/values/Texts'

const styles = {
  ContentContainer: {
    backgroundColor: Colors.facebook, // TODO :
    borderRadius: 100
  },
  AppletButton: {
    extend: 'Button',
    width: 630,
    cursor: 'default'
  },
  ButtonIcon: {
    alignSelf: 'center',
    width: 90,
    margin: '20px 40px'
  },
  ButtonText: {
    alignSelf: 'center',
    color: Colors.white,
    font: 'normal 28px/normal ' + Fonts.roboto
  },
  DropdownButton: {
    alignSelf: 'center',

    cursor: 'pointer',
    width: 90,
    margin: 20
  },
  Description: {
    alignSelf: 'center',

    margin: '30px 0',
    width: 380,
    color: Colors.white,
    opacity: 0.6,
    font: 'normal 18px/normal ' + Fonts.roboto,
    whiteSpace: 'pre-wrap'
  }
}

class AppletButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  render () {
    const { classes, title, description, src } = this.props
    let dropdownIcon = this.state.isOpen ? UpArrowIcon : DownArrowIcon

    return (
      <Flexbox
        className={classes.ContentContainer}
        column>
        <Flexbox
          className={classes.AppletButton}
          onClick={null}
          center>
          <img
            className={classes.ButtonIcon}
            src={src}
            alt={Alts.appletIcon} />
          <div className={classes.ButtonText}>
            {title}
          </div>
          <img
            className={classes.DropdownButton}
            src={dropdownIcon}
            alt={Alts.dropdownIcon}
            onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }} />
        </Flexbox>
        {this.state.isOpen &&
        <div className={classes.Description}>
          {description}
        </div>}
        {this.state.isOpen &&
        <ToggleButton
          isActive={false} // TODO : fetch
          text={Texts.turnOn} // TODO :
          textColor={Colors.facebook} // TODO :
        />}
      </Flexbox>
    )
  }
}

AppletButton.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

const StyledAppletButton = injectSheet({ ...styles, ...buttonStyles })(AppletButton)

export default StyledAppletButton
