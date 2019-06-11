import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Left,
  Icon,
  Body,
  Right,
  Title,
  Item,
  Label,
  Input,
  Picker,
  Form
} from "native-base";
import API from "../utils/API";
import Area from "../constants/Area";
import { FlatGrid } from "react-native-super-grid";
import _ from "lodash";
import Layout from "../constants/Layout";
import Global from "../Global";
import * as Animatable from "react-native-animatable";

export default class MakeAreaScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  DEFAULT_STEPS = [
    {
      title: "Choose a trigger app",
      render: this.renderServices.bind(this),
      mode: "action"
    },
    {
      title: "Choose an action",
      render: this.renderActions.bind(this),
      mode: "action"
    },
    { title: "Authentification required", mode: "action" },
    {
      title: "Action parameters",
      render: this.renderParameters.bind(this),
      mode: "action",
      button: "Next"
    },
    {
      title: "Choose a reaction app",
      render: this.renderServices.bind(this),
      mode: "reaction"
    },
    {
      title: "Choose a reaction",
      render: this.renderActions.bind(this),
      mode: "reaction"
    },
    { title: "Authentification required", mode: "reaction" },
    {
      title: "Reaction parameters",
      mode: "reaction",
      button: "Next",
      render: this.renderParameters.bind(this)
    },
    {
      title: "Name your AREA",
      render: this.renderNameArea.bind(this),
      button: "Done"
    }
  ];

  DEFAULT_STATE = {
    step: undefined,
    stepIndex: 0,
    area: {
      name: undefined,
      description: undefined,
      activated: true,
      action: {
        classeName: undefined,
        funcName: undefined,
        parameters: {}
      },
      reaction: {
        classeName: undefined,
        funcName: undefined,
        parameters: {}
      },
      reactions: []
    },
    steps: this.DEFAULT_STEPS,
    services: undefined
  };
  state = this.DEFAULT_STATE;

  constructor(props) {
    super(props);
    this.state.step = this.state.steps[0];
    this.props.navigation.addListener("willFocus", payload => {
      this.loadServices();
    });
  }

  loadServices() {
    API.get(Area.serviceRoute, {
      done: res => this.setState({ services: res.services })
    });
  }

  onSelectService(service) {
    var { step } = this.state;
    this.nextStep(() => {
      var newState = _.cloneDeep(this.state);
      newState.step.actions = service[step.mode + "s"];
      newState.area[step.mode].classeName = service.classeName;
      this.setState(newState);
    });
  }

  onSelectAction(action) {
    var { step } = this.state;
    var onStepChanged = () => {
      var newState = _.cloneDeep(this.state);
      newState.step.action = action;
      newState.area[step.mode].funcName = action.funcName;
      this.setState(newState);
    };
    this.nextStep(() => {
      if (!this.state.step.render || !action.auth) this.nextStep(onStepChanged);
      else onStepChanged();
    });
  }

  onParameterChanged(key, value) {
    var { step } = this.state;
    var newState = _.cloneDeep(this.state);
    newState.area[step.mode].parameters[key] = value;
    var requireParams = step.action.parameters.filter(p => p.required === true);
    newState.step.isCompleted = true;
    for (let i in requireParams) {
      if (!newState.area[step.mode].parameters[requireParams[i].name])
        newState.step.isCompleted = false;
    }
    this.setState(newState);
  }

  onDoneStep() {
    if (!this.state.step.isCompleted) return;
    if (this.state.stepIndex < this.state.steps.length - 1) this.nextStep();
    else this.makeArea();
  }

  makeArea() {
    var area = _.cloneDeep(this.state.area);
    area.reactions = [area.reaction];
    API.post(Area.areaRoute, {
      data: { area: area },
      done: res => {
        this.props.navigation.navigate("Home");
        this.setState(this.DEFAULT_STATE);
      },
      headers: { Authorization: Global.userToken }
    });
  }

  nextStep(onDone) {
    this.setState(
      {
        step: this.state.steps[this.state.stepIndex + 1],
        stepIndex: this.state.stepIndex + 1
      },
      () => {
        if (onDone) onDone();
        this.onStepChange();
      }
    );
  }

  prevStep(onDone) {
    this.setState(
      {
        step: this.state.steps[this.state.stepIndex - 1],
        stepIndex: this.state.stepIndex - 1
      },
      () => {
        if (onDone) onDone();
        this.onStepChange();
      }
    );
  }

  onStepChange() {}

  render() {
    return (
      <Container>
        {this.renderHeader()}
        {this.state.step.render && this.state.step.render()}
      </Container>
    );
  }

  renderHeader() {
    return (
      <Header style={{ backgroundColor: "white" }}>
        <Left style={{ flex: 1 }}>
          {this.state.stepIndex > 0 && (
            <Button transparent onPress={e => this.prevStep()}>
              <Icon name="arrow-back" fontSize={16} />
            </Button>
          )}
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>{this.state.step.title}</Title>
        </Body>
        <Right style={{ flex: 1 }}>
          {this.state.step.button && (
            <Button transparent onPress={this.onDoneStep.bind(this)}>
              <Text
                style={{
                  color: this.state.step.isCompleted ? "#08f" : "lightgray",
                  fontSize: 16
                }}
              >
                {this.state.step.button}
              </Text>
            </Button>
          )}
        </Right>
      </Header>
    );
  }

  renderServices() {
    var { services, step } = this.state;
    services = _.values(services).filter(
      service => service[step.mode + "s"].length > 0
    );
    if (services)
      return (
        <FlatGrid
          itemDimension={(Layout.window.width - 80) / 3}
          items={services}
          style={styles.serviceGrid}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={this.onSelectService.bind(this, item)}
            >
              <Animatable.View
                animation="bounceIn"
                key={"service" + index}
                style={styles.serviceItem}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                  source={{ uri: item.imageUrl }}
                />
              </Animatable.View>
            </TouchableWithoutFeedback>
          )}
        />
      );
  }

  renderActions() {
    var { step } = this.state;
    var actions = _.values(step.actions);
    return (
      <ScrollView style={styles.actionsCont}>
        {actions &&
          actions.map((item, index) => (
            <Animatable.View key={"action" + index} animation="fadeInUp" duration={200}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.onSelectAction.bind(this, item)}
              >
                <View style={{ flex: 2, justifyContent: "center", padding: 5 }}>
                  <Text style={{ fontWeight: "500" }}>{item.name}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", padding: 5 }}>
                  <Text style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ))}
      </ScrollView>
    );
  }

  renderParameters() {
    var { step } = this.state;
    if (!step.action) return;
    var { parameters } = step.action;
    return (
      <ScrollView style={styles.parametersCont}>
        {parameters.map((param, index) => {
          switch (param.type) {
            case "string":
            case "number":
            case "email":
              return (
                <View key={"item" + index} style={styles.paramRow}>
                  <Item stackedLabel>
                    <Label>{param.description}</Label>
                    <Input
                      value={this.state.area[step.mode].parameters[param.name]}
                      onChangeText={value =>
                        this.onParameterChanged(param.name, value)
                      }
                    />
                  </Item>
                </View>
              );

            case "list":
              return (
                <View key={"item" + index} style={styles.paramRow}>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder={param.description}
                      selectedValue={
                        this.state.area[step.mode].parameters[param.name]
                      }
                      onValueChange={value =>
                        this.onParameterChanged(param.name, value)
                      }
                    >
                      {param.default.map((option, index) => (
                        <Picker.Item
                          key={"option" + index}
                          label={option.name}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </Item>
                </View>
              );
          }
        })}
      </ScrollView>
    );
  }

  renderNameArea() {
    return (
      <Form>
        <Item stackedLabel>
          <Label>Name</Label>
          <Input
            value={this.state.area.name}
            onChangeText={value => {
              var newState = _.cloneDeep(this.state);
              newState.step.isCompleted = value ? true : false;
              newState.area.name = value;
              this.setState(newState);
            }}
          />
        </Item>
        <Item stackedLabel>
          <Label>Description</Label>
          <Input
            value={this.state.area.description}
            onChangeText={value =>
              this.setState({
                area: Object.assign(this.state.area, { description: value })
              })
            }
          />
        </Item>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  serviceGrid: {
    flex: 1
  },
  serviceItem: {
    height: (Layout.window.width - 80) / 3,
    justifyContent: "center",
    padding: 10
  },
  serviceImage: {
    height: "100%"
  },
  serviceName: {},
  actionsCont: { flex: 1, padding: 20 },
  button: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  parametersCont: { flex: 1, padding: 20 },
  paramRow: {
    marginTop: 10,
    marginBottom: 10
  },
  stepButton: {}
});
