import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import injectSheet from "react-jss";

import NavButton from "./NavButton";
import SideSpacer from "./SideSpacer";
import Flexbox from "./Flexbox";

import buttonStyles from "../styles/buttonStyles";
import PlaystoreLogo from "../res/drawable/logo_playstore.png";
import ExitIcon from "../res/drawable/exit.svg";
import LogoStain from "../res/drawable/LogoStain.svg";
import TopStain from "../res/drawable/BigStain6.svg";
import Paths from "../res/values/Paths";
import Fonts from "../res/values/Fonts";
import Colors from "../res/values/Colors";
import Texts from "../res/values/Texts";
import Alts from "../res/values/Alts";
import { deleteSession, getCookie } from "../helpers/cookies";
import Cookies from "../res/values/Cookies";

const styles = {
  PlaystoreLogo: {
    alignSelf: 'center',

    padding: '10px 0',
    height: 50,
    width: 50,
    cursor: 'pointer'
  },
  Container: {
    height: "115px",
    display: "flex",
    flexDirection: "row"
  },
  LogoContainer: {
    display: "inline-block",
    position: "relative",
    cursor: "pointer"
  },
  LogoText: {
    position: "absolute",
    left: "0",
    top: "19%",
    fontSize: 50,
    fontFamily: "Avenir",
    fontWeight: 900,
    letterSpacing: 10,
    // textShadow: Colors.grenadier + " 0px 0px 10px"
  },
  ContentContainer: {
    flexGrow: "1",
    borderBottom: Colors.doveGray + " solid 1px"
  },
  ButtonsContainer: { alignSelf: "center" },
  UsernameContainer: {
    alignSelf: "center",
    justifyContent: "center"
  },
  Username: {
    alignSelf: "center",
    font: "normal 24px/normal " + Fonts.roboto
  },
  ExitButton: {
    alignSelf: "center",

    cursor: "pointer",
    width: 30,
    margin: 20
  },
  TopStain: {
    zIndex: -1,
    position: "absolute",
    top: "-200px",
    left: "251px"
  },
  Hidden: { visibility: "hidden" },
  SignUpButton: { marginLeft: 32 }
};

const NavBarLogoContainer = props => {
  const { classes, history } = props;

  return (
    <div
      className={classes.LogoContainer}
      onClick={() => {
        history.push(Paths.root);
      }}
    >
      <img src={LogoStain} alt={Alts.stain} />
      <div className={classes.LogoText}>AREA</div>
    </div>
  );
};

const WithRouterStyledNavBarLogoContainer = withRouter(
  injectSheet(styles)(NavBarLogoContainer)
);

const NavBar = props => {
  const { classes } = props;

  const username = getCookie(Cookies.username);

  let logInClassName =
    classes.MediumEmphasisButton +
    (props.hideLogin ? " " + classes.Hidden : "");
  let signUpClassName =
    classes.HighEmphasisButton + (props.hideSignUp ? " " + classes.Hidden : "");

  const buttons = (
    <div className={classes.ButtonsContainer}>
      <NavButton
        className={logInClassName}
        label={Texts.login}
        to={Paths.login}
      />
      <NavButton
        className={signUpClassName + " " + classes.SignUpButton}
        label={Texts.signUp}
        to={Paths.signUp}
      />
    </div>
  );

  const usernameDisplay = (
    <Flexbox className={classes.UsernameContainer}>
      <div className={classes.Username}>{username}</div>
      <img
        className={classes.ExitButton}
        src={ExitIcon}
        alt={Alts.exitIcon}
        onClick={() => {
          deleteSession();
          props.enqueueSnackbar(Texts.nowDisconnected, { variant: "success" });
          props.history.push(Paths.root);
        }}
      />
    </Flexbox>
  );

  return (
    <div className={classes.Container} style={props.style}>
      <SideSpacer />
      <Flexbox className={classes.ContentContainer} spaceBetween>
        {(props.showLogo == true || props.showLogo === undefined) && (
          <WithRouterStyledNavBarLogoContainer />
        )}
        <img
          className={classes.PlaystoreLogo}
          onClick={() => props.history.push(Paths.apkDownload)}
          src={PlaystoreLogo}
          alt={Alts.playstoreIcon} />
        {username ? usernameDisplay : buttons}
      </Flexbox>
      <SideSpacer />
      <img className={classes.TopStain} src={TopStain} alt={Alts.stain} />
    </div>
  );
};

NavBar.propTypes = {
  hideLogin: PropTypes.bool,
  hideSignUp: PropTypes.bool
};

const WithRouterWithSnackbarStyledNavBar = withRouter(
  withSnackbar(injectSheet({ ...styles, ...buttonStyles })(NavBar))
);

export default WithRouterWithSnackbarStyledNavBar;
