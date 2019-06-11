import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import Area from "../constants/Area";
import API from "../utils/API";
import Global from "../Global";
import { LinearGradient } from "expo";
import gradient from "random-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {};
  constructor(props) {
    super(props);
    console.log(Global.userToken);
    this.props.navigation.addListener("willFocus", payload => {
      this.loadAreas();
    });
  }

  loadAreas() {
    API.get(Area.areaRoute, {
      done: res => {
        this.setState({ areas: res.areas });
      },
      headers: { Authorization: Global.userToken }
    });
  }

  hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];

  populate(a) {
    var alen = a.length;
    for (var i = 0; i < 7 - alen; i++) {
      var x = Math.round(Math.random() * 14);
      var y = this.hexValues[x];
      a += y;
    }
    return a;
  }

  darken(c) {
    var nc = "#";
    for (let i in c) {
      var cindex = this.hexValues.indexOf(c[i]);
      if (cindex >= 0) {
        var j = 0;
        while (cindex - j > 0 && j < 3) j++;
        nc += this.hexValues[cindex - j];
      }
    }
    return nc;
  }

  toggleArea(area) {
    area.activated = !area.activated;
    API.put(Area.areaRoute, {
      data: area,
      done: res => {
        this.loadAreas();
      },
      headers: { Authorization: Global.userToken }
    });
  }

  deleteArea(area) {
    API.delete(Area.areaRoute, {
      data: area,
      done: res => {
        this.loadAreas();
      },
      headers: { Authorization: Global.userToken }
    });
  }

  render() {
    var { areas } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          style={styles.container}
        >
          {areas &&
            areas.map((area, index) => {
              var grad = gradient(area.name + area.description).split(" ");
              var color1 = grad[3].replace(",", "");
              var color2 = this.darken(color1);
              if (!area.activated) {
                color1 = "lightgray";
                color2 = "gray";
              }
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={this.toggleArea.bind(this, area)}
                  key={"area" + index}
                >
                  <Animatable.View animation="fadeInUp" style={styles.areaButton}>
                    <LinearGradient
                      start={[0, 1]}
                      end={[1, 0]}
                      style={styles.gradientButton}
                      colors={[color1, color2]}
                    >
                      <TouchableOpacity
                        onPress={this.deleteArea.bind(this, area)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 30,
                          height: 30
                        }}
                      >
                        <Ionicons
                          name="ios-close"
                          size={40}
                          color="white"
                        />
                      </TouchableOpacity>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={styles.areaName} editable={false}>
                          {area.name}
                        </Text>
                      </View>
                      {area.description && (
                        <View style={{ flex: 1, justifyContent: "center" }}>
                          <Text style={styles.areaDesc} editable={false}>
                            {area.description}
                          </Text>
                        </View>
                      )}
                    </LinearGradient>
                  </Animatable.View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  areaButton: {
    width: "100%",
    minHeight: 150,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 15,
    marginBottom: 15
  },
  gradientButton: {
    padding: 20,
    borderRadius: 15,
    width: "100%",
    height: "100%"
  },
  areaName: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "600"
  },
  areaDesc: {
    fontSize: 16,
    color: "#efefef"
  }
});
