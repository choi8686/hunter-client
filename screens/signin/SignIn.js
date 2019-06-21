import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Input, Button } from "react-native-elements";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";

import { url } from "../../url";
var flag;

// 제목
class SignInTitle extends Component {
  render() {
    return <Text style={styles.title}>SignIn</Text>;
  }
}
//로그인 입력창
class InputBars extends Component {
  constructor() {
    super();

    this.state = { hidePassword: true };
  }

  // 비밀번호 가려주는 함수
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    const { changeErr, errorMsg } = this.props;
    return (
      // <View style={styles.inputContainer}>
      <View style={styles.passwordContainer}>
        <View style={styles.textBoxBtnHolder}>
          <Input
            placeholder="   ID "
            textAlign={"center"}
            leftIcon={{ type: "font-awesome", name: "user" }}
            containerStyle={{ marginBottom: 10, width: "90%" }}
            clearButtonMode="always"
            onChangeText={text => changeErr("nickname", "errorNickname", text)}
            style={styles.textBox}
          />
          {errorMsg("errorNickname")}
        </View>

        <View style={styles.textBoxBtnHolder}>
          <Input
            placeholder="   PASSWORD "
            textAlign={"center"}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            containerStyle={{ marginBottom: 10, width: "90%" }}
            clearButtonMode="always"
            onChangeText={text => changeErr("password", "errorPassword", text)}
            underlineColorAndroid="transparent"
            secureTextEntry={this.state.hidePassword}
            style={styles.textBox}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={this.managePasswordVisibility}
          >
            <Image
              source={
                this.state.hidePassword
                  ? require("../../assets/hide.png")
                  : require("../../assets/view.png")
              }
              style={styles.btnImage}
            />
          </TouchableOpacity>
          {errorMsg("errorPassword")}
        </View>
      </View>
      // </View>
    );
  }
}

export default class SignUp extends Component {
  state = {
    nickname: "",
    password: "",
    errorNickname: "",
    errorPassword: "",
    errorLogin: "",
    userId: null,

    //teamId
    teamInfo: null,
    modalVisible: false
  };

  flag = true;

  //로그인 버튼
  _submit = async () => {
    await this._errorMessages();

    if (
      this.state.nickname !== "" &&
      this.state.password !== "" &&
      this.state.errorNickname === "" &&
      this.state.errorPassword === ""
    ) {
      await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nickname: this.state.nickname,
          password: this.state.password
        })
      }).then(async res => {
        if (res.ok) {
          JWT = await res.json();
          console.log("--------login success---------", res.ok);
          flag = true;
          await fetch(`${url}/users/info`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${JWT.token}`
            }
          }).then(async res => {
            if (res.ok) {
              idRes = await res.json();
              console.log(idRes, "id res !!! 141 lines");
              await this.setState({
                userId: idRes.userInfo.id
              });

              await fetch(`${url}/teams/getUserIdTeam/` + this.state.userId, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(async res => {
                console.log(res, "res!!!!");
                if (res.ok) {
                  teamInfo = await res.json();
                  console.log(teamInfo, "a!!!!");
                  // console.log(teamInfo.getUserID === null, "a!!!!");
                  if (teamInfo !== null) {
                    // if (teamInfo.getUserId !== null) {
                    console.log("hi");
                    await this.setState({
                      teamInfo: teamInfo[0]
                    });
                    await AsyncStorage.setItem(
                      "userToken",
                      "aasertetdbc" +
                        "-" +
                        teamInfo.sex +
                        "-" +
                        teamInfo.count +
                        "-" +
                        teamInfo.age +
                        "-" +
                        teamInfo.comment +
                        "-" +
                        teamInfo.teamname +
                        "-" +
                        teamInfo.districtId +
                        "-" +
                        teamInfo.storeId +
                        "-" +
                        teamInfo.userId +
                        "-" +
                        teamInfo.id
                    );
                    await this._signInAsync();
                  } else {
                    await this._signInAsync();
                  }
                }
              });
            }
          });
        } else {
          console.log("--------login fail---------", res.ok);
          flag = false;
          this.setModalVisible(true);
        }

        //JWT
      });
    }
  };

  //로그인 성공시, userToken 저장하고 ChooseSex로 보내주는 함수
  _signInAsync = async () => {
    console.log("시발년아 장난 그만치고 내놔라 ");
    const { userId, teamInfo } = await this.state;
    console.log(teamInfo, "teamInfo!!!!!! SignIn.js 161 lines");
    console.log(userId, "userId!!!!!!!!  SignIn.js 162 lines");

    teamInfo
      ? this.props.navigation.navigate("Home", { userId, teamInfo })
      : this.props.navigation.navigate("ChooseSex", { userId });
  };

  //id, password 에러 잡아내는 함수 에러 없다면 this._submit함수 실행시켜서 로그인 시도
  _errorMessages = () => {
    if (this.state.nickname === "") {
      this.setState(() => ({ errorNickname: "아이디를 작성해주세요" }));
      flag = false;
    } else {
      this.setState(() => ({ errorNickname: "" }));
      flag = true;
    }
    if (this.state.password === "") {
      this.setState(() => ({ errorPassword: "비밀번호를 작성해주세요" }));
      flag = false;
    } else {
      this.setState(() => ({ errorPassword: "" }));
      flag = true;
    }
    if (this.state.nickname === "" || this.state.password === "") {
      flag = false;
    }

    return flag;
  };

  // 에러메세지 띄우는 함수
  _errorMsg = check => {
    const state = this.state;
    if (state[check]) {
      return (
        <Text style={{ color: "white", textAlign: "center" }}>
          {state[check]}
        </Text>
      );
    }
  };

  // 아이디, 패스워드 저장과 동시에 에러메세지도 저장해주는 함수
  _changeErr = (key, errName, text) => {
    this.setState({
      [key]: text,
      [errName]: ""
    });
  };

  //모달 true, false로 구분해주는 함수 ( true, false에 따라 모달창이 생기고 사라짐)
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["coral", "#f44283", "#f441bb", "#8341f4"]}
          style={styles.backGround}
        >
          <SignInTitle style={styles.title} />

          <KeyboardAvoidingView
            style={styles.KeyboardAvoidingViewStyle}
            behavior="padding"
            enabled
          >
            <InputBars changeErr={this._changeErr} errorMsg={this._errorMsg} />
          </KeyboardAvoidingView>

          <View style={styles.buttonHouse}>
            <Button
              title=" SignIn"
              color="white"
              buttonStyle={{
                width: "100%",
                backgroundColor: "deeppink",
                alignItems: "center"
              }}
              containerViewStyle={{ width: "100%", alignItems: "center" }}
              alignText="right"
              // style={styles.nextButton}
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "pink"
              }}
              onPress={this._submit}
            />
            <Button
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "pink"
              }}
              textAlign="center"
              title=" SignUp"
              color="white"
              buttonStyle={{
                width: "100%",
                backgroundColor: "mediumturquoise"
              }}
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            />
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.modalStyle}>
              <View style={styles.inModalStyle}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                    padding: 15
                  }}
                >
                  {" "}
                  아이디 혹은 비밀번호를 확인해주세요{" "}
                </Text>
                <Button
                  title="close "
                  color="black"
                  alignItems="center"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text> OK </Text>
                </Button>
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },

  backGround: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    top: 0
  },
  title: {
    marginTop: "5%",
    flex: 0.2,
    flexDirection: "column",
    color: "white",
    fontSize: 30
  },
  KeyboardAvoidingViewStyle: {
    flex: 0.5,
    width: "100%",
    paddingTop: Constants.statusBarHeight
  },

  passwordContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  textBoxBtnHolder: {
    height: "40%",
    position: "relative",
    alignSelf: "stretch",
    justifyContent: "center"
  },

  textBox: {
    height: "100%",
    fontSize: 18,
    alignSelf: "stretch",
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: "grey",
    borderRadius: 5
  },

  visibilityBtn: {
    position: "absolute",
    right: 3,
    height: 40,
    width: 35,
    padding: 5,
    paddingBottom: 13
  },

  btnImage: {
    paddingTop: "2%",
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  },

  buttonHouse: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-evenly",
    // alignItems: "center",
    width: "100%"
  },
  modalStyle: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center"
  },
  inModalStyle: {
    height: "25%",
    width: "80%",
    borderColor: "pink",
    borderWidth: 1.5,
    borderRadius: 20,
    borderStyle: "solid",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  }
});
