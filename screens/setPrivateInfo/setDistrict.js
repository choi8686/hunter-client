import React, { Fragment, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
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

export default class SetDistrict extends Component {
  state = {
    buttons: ["홍대입구역", "이태원역", "강남역", "건대입구역"],
    selectedIndex: null,

    presentDistrict: null,
    presentDistrictNum: null,
    image: this.props.navigation.state.params.image,
    sex: this.props.navigation.state.params.sex,
    teamname: this.props.navigation.state.params.teamname,
    count: this.props.navigation.state.params.count,
    averageAge: this.props.navigation.state.params.averageAge,
    comment: this.props.navigation.state.params.comment,
    userId: this.props.navigation.state.params.userId
  };

  _updateIndex = selectedIndex => {
    this.setState({
      selectedIndex,
      presentDistrict: this.state.buttons[selectedIndex],
      presentDistrictNum: selectedIndex + 1
    });
  };

  componentDidMount = () => {};

  render() {
    const {
      buttons,
      presentDistrict,
      presentDistrictNum,
      selectedIndex,
      sex,
      teamname,
      count,
      averageAge,
      comment,
      image,
      userId
    } = this.state;
    return (
      <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
        <View style={styles.container}>
          <Title name="현재 위치를 설정해주세요" style={styles.title} />
          <View style={styles.districtLists}>
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
              onPress={() => {
                presentDistrict
                  ? this.props.navigation.navigate("ChooseStore", {
                      sex,
                      teamname,
                      count,
                      averageAge,
                      comment,
                      image,
                      presentDistrict,
                      presentDistrictNum,
                      userId
                    })
                  : alert("현재 위치를 선택해주세요");
              }}
            />
          </View>
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
    width: "100%",
    left: 0,
    right: 0,
    top: 0
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%"
  },
  title: {
    flex: 0.2,
    padding: "20%",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  districtLists: {
    flex: 0.6,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: "5%",
    color: "white",
    height: "100%",
    width: "100%"
  },
  districtName: {
    flex: 0.25,
    flexDirection: "row",
    color: "white",
    fontSize: 15,
    height: "100%",
    width: "100%"
  },
  buttonHouse: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    height: "100%",
    paddingBottom: "5%"
  }
});
