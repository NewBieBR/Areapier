import React from "react";
import injectSheet from "react-jss";

import NavBar from "./NavBar";
import AuthForm from "./AuthForm";
import Flexbox from "./Flexbox";
import SideSpacer from "./SideSpacer";
import BlueStains from "./BlueStains";

import styles from "../styles/loginSignUpStyles";
import LoginGirl from "../res/drawable/LoginGirl.svg";
import Alts from "../res/values/Alts";

const s = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  },
  header: {
    flex: 1
  },
  body: {
    flex: 6,
    display: "flex",
    flexDirection: "row",
    paddingRight: 140
  },
  imgCont: {
    flex: 2
  },
  img: {
    width: "100%",
    height: "100%"
  },
  authFormCont: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

const Login = props => {
  const { classes } = props;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <NavBar hideLogin />
      </div>
      <div style={s.body}>
        <div style={s.imgCont}>
          <img src={LoginGirl} alt={Alts.loginGirl} style={s.img} />
        </div>
        <div style={s.authFormCont}>
          <AuthForm isLogin />
        </div>
      </div>
    </div>
  );
};

const StyledLogin = injectSheet(styles)(Login);

export default StyledLogin;
