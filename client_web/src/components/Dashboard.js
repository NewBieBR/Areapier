import React, { Component } from "react";
import injectSheet from "react-jss";

import NavBar from "./NavBar";
import Colors from "../res/values/Colors";
import Fonts from "../res/values/Fonts";
import MakeAREA from "./MakeAREA";
import { getCookie } from "../helpers/cookies";
import Cookies from "../res/values/Cookies";
import _ from "lodash";
import {
  Button,
  ListItem,
  List,
  ListItemSecondaryAction,
  Switch,
  ListItemText,
  IconButton,
  Paper
} from "@material-ui/core";
import API from "../services/Users/API";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  "@global body": { overflowX: "hidden" },
  PageContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  TitleContainer: {
    cursor: "default",
    zIndex: 1,
    alignSelf: "center",
    margin: "100px 0",
    padding: "40px 29px",
    boxShadow: Colors.mako + " 0 3px 15px",
    backgroundColor: Colors.white,
    border: "none"
  },
  Title: { font: "normal 48px/normal " + Fonts.roboto },
  GridContainer: {
    alignSelf: "center",
    display: "grid",
    gridTemplateColumns: "repeat(3, auto)",
    marginBottom: 100
  },
  ServiceButton: {
    margin: 4,
    width: 250,
    height: 250,
    borderRadius: 60,
    display: "flex",
    justifyContent: "center"
  },
  ServiceImage: {
    alignSelf: "center",
    width: 130,
    margin: "auto"
  },
  button: {
    flex: 1,
    width: "50%"
  }
};

const s = {
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: "column"
  },
  header: {
    flex: 1
  },
  body: {
    flex: 6,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 140,
    paddingRight: 140
  },
  bodyTop: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  titleCont: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  title: {
    fontSize: 25
  },
  buttonCont: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  button: {
    width: "80%"
  },
  bodyBottom: {
    flex: 7,
    position: "relative",
    marginBottom: 30

  },
  createArea: {
    fontSize: 25,
    color: "lightgray",
    fontWeight: 300,
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -50%)"
  },
  areaListCont: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    position: "absolute",
    boxShadow: "none",
  },
  areaList: {}
};

class Dashboard extends Component {
  state = { makingArea: false, areas: null };

  _loadAreas() {
    API.get("/users/areas", {
      headers: { Authorization: getCookie(Cookies.userToken) }
    }).then(res => {
      this.setState({ areas: res.data.areas });
    });
  }

  _toggleArea(area, value) {
    area.activated = value;
    API.put("/users/areas", area, {
      headers: { Authorization: getCookie(Cookies.userToken) }
    }).then(res => {
      this._loadAreas();
    });
  }

  _deleteArea(area) {
    API.delete("/users/areas", {
      data: { id: area.id },
      headers: { Authorization: getCookie(Cookies.userToken) }
    }).then(res => {
      this._loadAreas();
    });
  }

  componentDidMount() {
    this._loadAreas();
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={s.container}>
        <div style={s.header}>
          <NavBar />
        </div>
        <div style={s.body}>
          {!this.state.makingArea && this._renderBodyTop()}
          {this._renderBodyBottom()}
        </div>
      </div>
    );
  }

  _renderBodyTop() {
    return (
      <div style={s.bodyTop}>
        <div style={s.titleCont}>
          <span style={s.title}>Your AREAS</span>
        </div>
        <div style={s.buttonCont}>
          <Button
            variant="outlined"
            color="primary"
            style={s.button}
            onClick={() => this.setState({ makingArea: true })}
          >
            Make an AREA
          </Button>
        </div>
      </div>
    );
  }

  _renderBodyBottom() {
    return (
      <div style={s.bodyBottom}>
        {!this.state.makingArea && this.state.areas && this.state.areas.length > 0 && this._renderAreaList()}
        {!this.state.makingArea &&
          (!this.state.areas || this.state.areas.length < 1) && (
            <div style={s.createArea}>No AREAS created yet</div>
          )}
        {this.state.makingArea && (
          <MakeAREA
            onDone={() => {
              this._loadAreas();
              this.setState({ makingArea: false });
            }}
          />
        )}
      </div>
    );
  }

  _renderAreaList() {
    return (
      <Paper style={s.areaListCont}>
        <List component="nav" style={s.areaList}>
          {this.state.areas.map((area, index) => (
            <ListItem button>
              <ListItemText primary={area.name} secondary={area.description} />
              <ListItemSecondaryAction>
                <Switch
                  onChange={(s, value) => this._toggleArea(area, value)}
                  checked={area.activated}
                  color="primary"
                />
                <IconButton
                  aria-label="Delete"
                  onClick={() => this._deleteArea(area)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

const StyledDashboard = injectSheet(styles)(Dashboard);

export default StyledDashboard;
