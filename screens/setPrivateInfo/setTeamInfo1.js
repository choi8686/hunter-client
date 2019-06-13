import React, { Fragment, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Input, Button, ButtonGroup, Icon } from "react-native-elements";
import { LinearGradient, Constants } from "expo";

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
    );
  }
}

export default class TeamInfo1 extends Component {
  state = {
    countButtons: ["1인", "2인", "3인", "4인"],
    userId: this.props.navigation.state.params.userId,
    sex: this.props.navigation.state.params.sex,
    teamname: null,
    averageAge: null,
    count: null,
    selectedIndex: null
  };

  _saveTeamName = e => {
    if (e.nativeEvent.text.length < 7) {
      this.setState({
        teamname: e.nativeEvent.text
      });
    } else {
      alert("7글자 이내로 작성해주세요");
    }
  };

  _updateIndex = selectedIndex => {
    this.setState({
      selectedIndex,
      count: selectedIndex + 1
    });
  };

  componentDidMount = () => {};

  render() {
    const { teamname, count, sex, userId, selectedIndex, countButtons } = this.state;

    return (
      <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
        <Title name="팀 정보를 입력해주세요" style={styles.title} />
        <KeyboardAvoidingView style={styles.KeyboardAvoidingViewStyle} behavior="padding" enabled>
          <View style={styles.contentsList}>
            <View style={styles.content}>
              <Text>팀 이름을 만들어주세요</Text>
              <Input
                placeholder="     6글자 이내 "
                textAlign={"center"}
                containerStyle={{ width: "50%" }}
                clearButtonMode="always"
                onChange={this._saveTeamName}
              />
            </View>
            <View style={styles.content}>
              <Text>팀 인원을 선택해주세요</Text>
              <ButtonGroup
                onPress={this._updateIndex}
                selectedIndex={selectedIndex}
                buttons={countButtons}
                containerStyle={{ height: 35, width: "80%" }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonHouse}>
          <Button
            title=" Submit"
            color="white"
            icon={<Icon name="check-circle" size={15} color="pink" />}
            onPress={() => {
              teamname && count
                ? this.props.navigation.navigate("SetTeamInfo2", { teamname, count, sex, userId })
                : alert("팀 이름과 인원수를 설정해주세요");
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
    justifyContent: "center",
    width: "100%",
    left: 0,
    right: 0,
    top: 0
  },
  title: {
    flex: 0.2,
    marginTop: "10%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 20
  },
  KeyboardAvoidingViewStyle: { flex: 0.6, width: "100%", paddingTop: Constants.statusBarHeight },
  contentsList: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    width: "100%",
    marginBottom: "15%"
  },
  content: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    width: "100%"
  },
  buttonHouse: {
    flex: 0.2,
    color: "white",
    height: "100%"
  }
});
