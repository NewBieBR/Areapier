import React from "react";
import injectSheet from "react-jss";

import NavBar from "./NavBar";
import Flexbox from "./Flexbox";
import AuthForm from "./AuthForm";
import SideSpacer from "./SideSpacer";
import BlueStains from "./BlueStains";

import styles from "../styles/loginSignUpStyles";
import Sculptor from "../res/drawable/Sculptor.svg";
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

const SignUp = props => {
  const { classes } = props;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <NavBar hideSignUp />
      </div>
      <div style={s.body}>
        <div style={s.imgCont}>
          <img src={Sculptor} alt={Alts.sculptor} style={s.img} />
        </div>
        <div style={s.authFormCont}>
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  );
};

const StyledSignUp = injectSheet(styles)(SignUp);

export default StyledSignUp;
