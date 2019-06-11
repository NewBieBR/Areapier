import React, { Component } from "react";
import injectSheet from "react-jss";
import Colors from "../res/values/Colors";
import Fonts from "../res/values/Fonts";
import API from "../services/Users/API";
import _ from "lodash";
import { getCookie } from "../helpers/cookies";
import Cookies from "../res/values/Cookies";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

const styles = {
  "@global body": { overflowX: "hidden", fontFamily: "Avenir" },
  PageContainer: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    margin: 20,
    width: "6vw",
    height: "6vw",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center"
  },
  ServiceImage: {
    alignSelf: "center",
    width: "80%",
    margin: "auto"
  },
  title: {
    width: "100%",
    textAlign: "center"
  },
  textField: {
    marginBottom: 30,
    width: "100%"
  }
};

const STEP = {
  ActionApp: 0,
  Action: 1,
  ActionAuth: 2,
  ActionParams: 3,
  ReactionApp: 4,
  Reaction: 5,
  ReactionAuth: 6,
  ReactionParams: 7,
  AreaInfo: 8
};

class Dashboard extends Component {
  _steps = [
    { title: "Choose a trigger app" },
    { title: "Choose an action" },
    { title: "Authentification required" },
    { title: "Action parameters" },
    { title: "Choose a reaction app" },
    { title: "Choose a reaction" },
    { title: "Authentification required" },
    { title: "Reaction parameters" },
    { title: "Name your AREA" }
  ];
  _area = {
    activated: true,
    action: {
      parameters: {}
    },
    reaction: {
      parameters: {}
    },
    radioValue: undefined
  };

  state = {
    services: null,
    step: STEP.ActionApp,
    selectedActionId: null,
    selectedActionIndex: null,
    selectedReactionId: null,
    selectedReactionIndex: null,
    authRequire: false,
    stepCompleted: false
  };

  _selectService(id) {
    if (this.state.step === STEP.ActionApp) {
      this._area.action.classeName = this.state.services[id].classeName;
      this.setState({
        selectedActionId: id,
        step: STEP.Action
      });
    } else {
      this._area.reaction.classeName = this.state.services[id].classeName;
      this.setState({
        selectedReactionId: id,
        step: STEP.Reaction
      });
    }
  }

  _onSelectAction(e) {
    var service = this.state.services[
      this.state.step == STEP.Action
        ? this.state.selectedActionId
        : this.state.selectedReactionId
    ];
    var actions =
      this.state.step == STEP.Action ? service.actions : service.reactions;
    var action = actions[e.target.value];
    if (this.state.step == STEP.Action) {
      this._area.action.funcName = action.funcName;
      this.setState({
        selectedActionIndex: e.target.value,
        authRequire: action.auth,
        stepCompleted: true,
        radioValue: e.target.value
      });
    } else {
      this._area.reaction.funcName = action.funcName;
      this.setState({
        selectedReactionIndex: e.target.value,
        authRequire: action.auth,
        stepCompleted: true,
        radioValue: e.target.value
      });
    }
  }

  _nextStep() {
    this.setState(
      {
        step: this.state.step + 1,
        stepCompleted: false,
        radioValue: undefined
      },
      this._onStepChange.bind(this)
    );
  }
  _prevStep() {
    if (this.state.step === 0 && this.props.onDone) this.props.onDone();
    this.setState({
      step: this.state.step - 1,
      stepCompleted: false,
      radioValue: undefined
    });
  }

  _onStepChange() {
    if (
      this.state.step == STEP.ActionParams ||
      this.state.step == STEP.ReactionParams
    ) {
      var service = this.state.services[
        this.state.step == STEP.ReactionParams
          ? this.state.selectedReactionId
          : this.state.selectedActionId
      ];
      var actions =
        this.state.step == STEP.ReactionParams
          ? service.reactions
          : service.actions;
      var action =
        actions[
          this.state.step == STEP.ReactionParams
            ? this.state.selectedReactionIndex
            : this.state.selectedActionIndex
        ];
      if (action.parameters.length < 1) {
        this._nextStep();
        return;
      }
    } else if (
      this.state.step == STEP.ActionAuth ||
      this.state.step == STEP.ReactionAuth
    ) {
      var service = this.state.services[
        this.state.step == STEP.ActionAuth
          ? this.state.selectedActionId
          : this.state.selectedReactionId
      ];
      var actions =
        this.state.step == STEP.ActionAuth
          ? service.actions
          : service.reactions;
      var action =
        actions[
          this.state.step == STEP.ActionAuth
            ? this.state.selectedActionIndex
            : this.state.selectedReactionIndex
        ];

      if (!action || !action.auth) {
        this._nextStep();
        return;
      }
    } else if (this.state.step > STEP.AreaInfo) this._makeArea();
  }

  _makeArea() {
    this._area.reactions = [this._area.reaction];
    API.post(
      "/users/areas",
      { area: this._area },
      { headers: { Authorization: getCookie(Cookies.userToken) } }
    ).then(res => {
      console.log(res);
    });
    if (this.props.onDone) this.props.onDone();
  }

  _handleParamChange(param, e) {
    var service = this.state.services[
      this.state.step === STEP.ActionParams
        ? this.state.selectedActionId
        : this.state.selectedReactionId
    ];
    var actions =
      this.state.step === STEP.ActionParams
        ? service.actions
        : service.reactions;
    var action =
      actions[
        this.state.step === STEP.ActionParams
          ? this.state.selectedActionIndex
          : this.state.selectedReactionIndex
      ];
    var params = _.filter(action.parameters, param => param.required === true);
    this._area[
      this.state.step === STEP.ActionParams ? "action" : "reaction"
    ].parameters[param.name] = e.target.value;
    var stepCompleted = true;
    for (let i in params) {
      var iparam = params[i];
      if (
        !this._area[
          this.state.step === STEP.ActionParams ? "action" : "reaction"
        ].parameters[iparam.name]
      ) {
        stepCompleted = false;
      }
    }
    this.setState({ stepCompleted: stepCompleted });
  }

  componentDidMount() {
    API.get("/services").then(res => {
      this.setState({ services: res.data.services });
    });
  }

  render() {
    const { classes } = this.props;
    var { step } = this.state;
    var currentStep = this._steps[step];
    return (
      <div>
        <div className={classes.PageContainer}>
          {currentStep && currentStep.title && (
            <h2 className={classes.title}>{currentStep.title}</h2>
          )}
          {(step == STEP.ActionApp || step == STEP.ReactionApp) &&
            this._renderServices()}
          {(step == STEP.Action || step == STEP.Reaction) &&
            this._renderServiceActions()}
          {(step == STEP.ActionAuth || step == STEP.ReactionAuth) &&
            this._renderAuthSelection()}
          {(step == STEP.ActionParams || step == STEP.ReactionParams) &&
            this._renderParamsInputs()}
          {step == STEP.AreaInfo && this._renderInfoForm()}
          {this.state.step === STEP.ReactionParams &&
            this._renderReturnValues()}
          {step != STEP.ActionApp && step != STEP.ReactionApp && (
            <Button
              variant="outlined"
              color="primary"
              disabled={!this.state.stepCompleted}
              onClick={this._nextStep.bind(this)}
              size="large"
              style={{ width: "30%", marginTop: 50 }}
            >
              Continue
            </Button>
          )}

          <Button
            variant="outlined"
            color="primary"
            onClick={this._prevStep.bind(this)}
            size="large"
            style={{ width: "30%", marginTop: 50 }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  _renderServices() {
    return (
      <div className={this.props.classes.GridContainer}>
        {this.state.services &&
          Object.keys(this.state.services).map(
            this._renderServiceButton.bind(this)
          )}
      </div>
    );
  }

  _renderServiceActions() {
    var service = this.state.services[
      this.state.step == STEP.Reaction
        ? this.state.selectedReactionId
        : this.state.selectedActionId
    ];
    var actions =
      this.state.step == STEP.Reaction ? service.reactions : service.actions;
    return (
      <div style={{ width: "100%" }}>
        <FormControl
          component="fieldset"
          className={this.props.classes.formControl}
        >
          <RadioGroup
            aria-label="actions"
            name="actions"
            value={this.state.radioValue}
            className={this.props.classes.group}
            onChange={this._onSelectAction.bind(this)}
          >
            {actions.map((item, index) => (
              <FormControlLabel
                key={"action" + index}
                value={"" + index}
                control={<Radio color="primary" />}
                label={
                  <div>
                    <span>{item.name}</span>
                    <br />
                    <span style={{ fontSize: 12, color: "gray" }}>
                      {item.description}
                    </span>
                  </div>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }

  _renderServiceButton(id, index) {
    var item = this.state.services[id];
    return (
      <Button
        key={"service-button" + index}
        className={this.props.classes.ServiceButton}
        onClick={() => this._selectService(id)}
      >
        <img
          className={this.props.classes.ServiceImage}
          src={this.state.services[id].imageUrl}
          alt={this.state.services[id].name}
        />
      </Button>
    );
  }

  _renderAuthSelection() {
    return <div>auth</div>;
  }

  _renderParamsInputs() {
    var service = this.state.services[
      this.state.step == STEP.ActionParams
        ? this.state.selectedActionId
        : this.state.selectedReactionId
    ];
    var actions =
      this.state.step == STEP.ActionParams
        ? service.actions
        : service.reactions;
    var action =
      actions[
        this.state.step == STEP.ActionParams
          ? this.state.selectedActionIndex
          : this.state.selectedReactionIndex
      ];
    return action.parameters.map((key, index) => {
      return (
        <div style={{ width: "100%", marginBottom: 30 }}>
          <div style={{ color: "gray", fontSize: 14, marginBottom: 10 }}>
            {action.parameters[index].description}
          </div>
          {this._renderParamInput(action.parameters[index], index)}
        </div>
      );
    });
  }

  _renderReturnValues() {
    var service = this.state.services[this.state.selectedActionId];
    var actions = service.actions;
    var selectedAction = actions[this.state.selectedActionIndex];
    return (
      <div
        style={{
          border: "1px solid #FF5722",
          borderRadius: 5,
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          padding: 10
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold" }}>Return values</div>
        <div>
          Add $ before the return value's name. Example: "The crypto price is
          $crypto_price"
        </div>
        <List>
          {selectedAction &&
            selectedAction.returnValue &&
            selectedAction.returnValue.map((item, index) => (
              <ListItem key={"item" + index}>
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
              </ListItem>
            ))}
        </List>
      </div>
    );
  }

  _renderParamInput(param, index) {
    switch (param.type) {
      case "string":
      case "number":
      case "email":
        return (
          <div>
            <TextField
              key={"input" + index}
              id={param.name}
              variant="outlined"
              label={param.name}
              type={param.type}
              value={this._area.action.parameters[param.name]}
              onChange={e => this._handleParamChange(param, e)}
            />
          </div>
        );
      case "list":
        return this._renderListInput(param);
    }
  }

  _renderListInput(param) {
    return (
      <FormControl
        component="fieldset"
        className={this.props.classes.formControl}
      >
        <RadioGroup
          aria-label="listinputs"
          name="listinputs"
          value={this._area.action.parameters[param.name]}
          className={this.props.classes.group}
          onChange={e => this._handleParamChange(param, e)}
        >
          {param.default.map((item, index) => (
            <FormControlLabel
              key={"listinput" + index}
              value={item.value}
              control={<Radio color="primary" />}
              label={item.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  _renderInfoForm() {
    return (
      <div style={{ width: "50%" }}>
        <TextField
          variant="outlined"
          label="Name"
          className={this.props.classes.textField}
          value={this._area.name}
          onChange={e => {
            this._area.name = e.target.value;
            if (this._area.name) this.setState({ stepCompleted: true });
          }}
        />
        <br />
        <TextField
          variant="outlined"
          className={this.props.classes.textField}
          label="Description"
          value={this._area.description}
          onChange={e => (this._area.description = e.target.value)}
        />
      </div>
    );
  }
}

const StyledDashboard = injectSheet(styles)(Dashboard);

export default StyledDashboard;
