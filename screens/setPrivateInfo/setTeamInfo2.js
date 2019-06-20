import React, { Fragment, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { LinearGradient, Constants } from "expo";

import QuickPicker from "quick-picker";

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
    );
  }
}

export default class TeamInfo2 extends Component {
  state = {
    sex: this.props.navigation.state.params.sex,
    teamname: this.props.navigation.state.params.teamname,
    count: this.props.navigation.state.params.count,
    averageAge: "",
    comment: "",
    userId: this.props.navigation.state.params.userId,

    ageRange: "",
    selectedLetter: "나이 선택하기"
  };

  _saveComment = e => {
    if (e.nativeEvent.text.length <= 25) {
      this.setState({
        comment: e.nativeEvent.text
      });
    } else {
      alert("글자수는 25개 이하여야 합니다.");
    }
  };

  //나이 범위 설정해주는 함수
  _ageRange = (start, stop, step) => {
    return Array.from({ length: (stop - start) / step }, (_, i) =>
      String(start + i * step)
    );
  };

  //나이선택 클릭시 picker(modal) 창 띄워주는 함수
  _onPressText = () => {
    QuickPicker.open({
      items: this.state.ageRange,
      selectedValue: this.state.selectedLetter,
      doneButtonText: "선택",
      onValueChange: selectedValueFromPicker =>
        this.setState({
          selectedLetter: selectedValueFromPicker,
          averageAge: selectedValueFromPicker
        }),
      useNativeDriver: true,

      itemStyleAndroid: {
        color: "grey",
        padding: 10
      },
      selectedItemStyleAndroid: {
        color: "#0076ff",
        fontWeight: "500"
      }
    });
  };

  //화면 실행되자마자 quicker에 보여질 평균나이를 띄워준다.
  componentDidMount = () => {
    let ageRange = this._ageRange(20, 36, 1);
    this.setState({
      ageRange: ageRange
    });
  };

  render() {
    const { sex, teamname, count, averageAge, comment, userId } = this.state;
    return (
      <LinearGradient
        colors={["coral", "#f44283", "#f441bb", "#8341f4"]}
        style={styles.backGround}
      >
        <Title name="팀 정보를 입력해주세요" style={styles.title} />
        <KeyboardAvoidingView
          style={styles.KeyboardAvoidingViewStyle}
          behavior="padding"
          enabled
        >
          <View style={styles.contentsList}>
            <View style={styles.comment}>
              <Text>필살 멘트</Text>

              <Input
                placeholder="      우리팀의 필살멘트( 20글자 제한) "
                textAlign={"center"}
                containerStyle={styles.content}
                clearButtonMode="always"
                onChange={e => {
                  this._saveComment(e);
                }}
              />
            </View>
            <View style={styles.averageAgeBox}>
              <Text>평균 나이</Text>
              <View style={styles.container}>
                <TouchableOpacity native={false} onPress={this._onPressText}>
                  <Text style={styles.averageAge}>
                    {this.state.selectedLetter}
                  </Text>
                </TouchableOpacity>
                <QuickPicker />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonHouse}>
          <Button
            title=" Submit"
            color="white"
            buttonStyle={{ width: "100%", backgroundColor: "deeppink" }}
            containerViewStyle={{ width: "100%" }}
            icon={<Icon name="check-circle" size={15} color="pink" />}
            onPress={() => {
              averageAge && comment
                ? this.props.navigation.navigate("ChooseDistrict", {
                    sex,
                    teamname,
                    count,
                    averageAge,
                    comment,
                    userId
                  })
                : alert("필살멘트와 평균나이를 입력해주세요");
            }}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
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
    alignItems: "center",
    color: "white",
    fontSize: 20
  },
  KeyboardAvoidingViewStyle: {
    flex: 0.6,
    width: "100%",
    paddingTop: Constants.statusBarHeight
  },
  contentsList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    width: "100%",
    height: "100%"
  },
  averageAgeBox: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "10%"
  },
  averageAge: {
    color: "white",
    fontSize: 20,
    width: "100%"
  },
  comment: {
    flex: 0.5,
    alignItems: "center",
    width: "100%"
  },
  buttonHouse: {
    flex: 0.2,
    color: "white",
    height: "100%",
    marginTop: "5%"
  }
});
