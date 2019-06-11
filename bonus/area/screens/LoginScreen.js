import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast
} from "native-base";
import Area from "../constants/Area";
import API from "../utils/API";

const SIGN_UP = "SIGN_UP";
const LOGIN = "LOGIN";

export default class LoginScreen extends React.Component {
  state = {
    mode: LOGIN
  };

  toggleMode() {
    this.setState({ mode: this.state.mode === SIGN_UP ? LOGIN : SIGN_UP });
  }

  userLogin() {
    API.post(Area.connectionRoute, {
      data: {
        username: this.state.username,
        password: this.state.password,
        authType: Area.authType
      },
      done: res => {
        Toast.show({
          text: res.status !== 200 ? res._bodyText : "Connection successfully",
          type: res.status !== 200 ? "danger" : "success",
          position: "top"
        });
        if (res.status === 200 && this.props.onDone)
          this.props.onDone(res.token);
      }
    });
  }

  login() {
    if (this.state.mode === SIGN_UP) {
      if (this.state.password !== this.state.cpassword)
        Toast.show({
          text: "Password doesn't match",
          buttonText: "Okay",
          type: "warning",
          position: "top"
        });
      else
        API.post(Area.userRoute, {
          data: {
            username: this.state.username,
            password: this.state.password,
            authType: Area.authType
          },
          done: res => {
            Toast.show({
              text: res._bodyText,
              type: res.status !== 200 ? "danger" : "success",
              position: "top"
            });
            if (res.status === 200) this.userLogin();
          }
        });
    } else this.userLogin();
  }

  render() {
    return (
      <Container>
        <Header />
        <Content style={styles.body}>{this.renderNormalLogin()}</Content>
      </Container>
    );
  }

  renderNormalLogin() {
    return (
      <Form style={styles.form}>
        <Item stackedLabel>
          <Label>Username</Label>
          <Input
            value={this.state.username}
            onChangeText={value => this.setState({ username: value })}
          />
        </Item>
        <Item stackedLabel last={this.state.mode === LOGIN}>
          <Label>Password</Label>
          <Input
            secureTextEntry
            value={this.state.password}
            onChangeText={value => this.setState({ password: value })}
          />
        </Item>
        {this.state.mode === SIGN_UP && (
          <Item stackedLabel last>
            <Label>Confirm password</Label>
            <Input
              secureTextEntry
              value={this.state.cpassword}
              onChangeText={value => this.setState({ cpassword: value })}
            />
          </Item>
        )}
        <Button
          style={styles.loginButton}
          onPress={this.login.bind(this)}
          primary
          block
        >
          <Text>{this.state.mode === SIGN_UP ? "Sign Up" : "Login"}</Text>
        </Button>
        <Button transparent block onPress={this.toggleMode.bind(this)}>
          <Text>
            {this.state.mode === SIGN_UP
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 20
  },
  form: {
    marginLeft: 10,
    marginRight: 10
  },
  loginButton: {
    marginTop: 30
  }
});
