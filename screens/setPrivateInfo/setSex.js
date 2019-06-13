import React, { Fragment, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button, ButtonGroup } from "react-native-elements";
import { LinearGradient } from "expo";

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
    );
  }
}

export default class Sex extends Component {
  state = {
    userId: this.props.navigation.state.params.userId,
    sex: null,
    buttons: ["Woman", "Man"],
    selectedIndex: null
  };

  _updateIndex = selectedIndex => {
    this.setState({
      selectedIndex,
      sex: String(selectedIndex)
    });
  };

  componentDidMount = () => {};

  render() {
    const { sex, userId, buttons, selectedIndex } = this.state;

    return (
      <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
        <Title name="성별을 선택해주세요" style={styles.title} />
        <View style={styles.contentsList}>
          <ButtonGroup
            onPress={this._updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 50 }}
          />
        </View>
        <View style={styles.buttonHouse}>
          <Button
            title="Submit"
            color="white"
            icon={{ type: "font-awesome", name: "check-circle", color: "pink" }}
            onPress={() => {
              sex ? this.props.navigation.navigate("SetTeamInfo1", { sex, userId }) : alert("성별을 선택해주세요");
            }}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  title: {
    flex: 0.2,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  contentsList: {
    flex: 0.6,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10%",
    color: "white",
    width: "100%"
  },
  buttonHouse: {
    flex: 0.2,
    color: "white",
    height: "100%",
    marginBottom: "5%"
  }
});
