import React, { Fragment, Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  View,
  Modal,
  KeyboardAvoidingView
} from "react-native";
import { Input, Button } from "react-native-elements";

import { LinearGradient, Constants } from "expo";
import { url } from "../../url";

class SignUpTitle extends Component {
  render() {
    return (
      <Fragment>
        <Text style={styles.title}>SignUp</Text>
      </Fragment>
    );
  }
}

//로그인 입력창
class InputBars extends Component {
  constructor() {
    super();

    this.state = { hidePassword: true, hidePasswordCheck: true };
  }

  // 비밀번호 가려주는 함수
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  managePasswordVisibilityCheck = () => {
    this.setState({ hidePasswordCheck: !this.state.hidePasswordCheck });
  };
  render() {
    const { changeErr, errorMsg } = this.props;

    return (
      <View style={styles.passwordContainer}>
        <View style={styles.textBoxBtnHolder}>
          <Input
            placeholder="   ID"
            textAlign={"center"}
            leftIcon={{ type: "font-awesome", name: "user" }}
            containerStyle={{ marginBottom: 10, width: "90%" }}
            clearButtonMode="always"
            onChangeText={text => changeErr("nickname", "errorNickname", text)}
          />
          {errorMsg("errorNickname")}
        </View>

        <View style={styles.textBoxBtnHolder}>
          <Input
            placeholder="   PASSWORD"
            textAlign={"center"}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            containerStyle={{ marginBottom: 10, width: "90%" }}
            onChangeText={text => changeErr("password", "errorPassword", text)}
            clearButtonMode="always"
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

        <View style={styles.textBoxBtnHolder}>
          <Input
            placeholder="  PASSWORD again"
            textAlign={"center"}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            containerStyle={{ marginBottom: 10, width: "90%" }}
            onChangeText={text =>
              changeErr("password_CHECK", "errorCheck", text)
            }
            clearButtonMode="always"
            underlineColorAndroid="transparent"
            secureTextEntry={this.state.hidePasswordCheck}
            style={styles.textBox}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={this.managePasswordVisibilityCheck}
          >
            <Image
              source={
                this.state.hidePasswordCheck
                  ? require("../../assets/hide.png")
                  : require("../../assets/view.png")
              }
              style={styles.btnImage}
            />
          </TouchableOpacity>
          {errorMsg("errorCheck")}
        </View>
      </View>
    );
  }
}

export default class SignUp extends Component {
  flag = false;

  state = {
    nickname: "",
    password: "",
    password_CHECK: "",
    errorNickname: "",
    errorPassword: "",
    errorCheck: "",
    modalVisible: false,
    userId: null
  };

  //id, password설정 및 에러 메세지 설정해주기 (아이디, 패스워드에 따라 재활용가능한 함수)
  _changeErr = (key, errName, text) => {
    this.setState({
      [key]: text,
      [errName]: ""
    });
  };

  //에러 메세지 띄우기
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

  //SignIn페이지로 보내기
  _signInAsync = () => {
    this.props.navigation.navigate("SignIn");
  };

  //아이디 or 비밀번호 틀렸을 시, modal 창 띄우기
  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // DB에 아이디랑 비밀번호 가입 요청
  _submit = async () => {
    await this._errorMessages();

    if (
      this.state.nickname.length &&
      this.state.password.length &&
      this.state.errorNickname.length === 0 &&
      this.state.errorPassword.length === 0 &&
      this.state.password === this.state.password_CHECK
    ) {
      fetch(`${url}/users/signup`, {
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
          console.log("--------sign up success---------", res.ok);
          flag = true;

          this._signInAsync();
        } else {
          console.log("--------sign up fail---------", res.ok);
          flag = false;
          this._setModalVisible(true);
        }
      });
    }
  };

  //id, password 에러 잡아내는 함수 에러 없다면 this._submit함수 실행시켜서 회원가입시도
  _errorMessages = () => {
    //닉네임은 한글 영문 숫자 포함 4~8글자
    var regTypeID = /^[a-zA-Z0-9+]{6,11}$/gi;
    //비밀번호는 영문 대소문자 및 숫자 또는 특수문자 포함 6-20글자
    var regTypePW = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    if (this.state.nickname === "") {
      this.setState(() => ({ errorNickname: "아이디를 작성해주세요" }));
      flag = false;
    } else if (!regTypeID.test(this.state.nickname)) {
      this.setState(() => ({
        errorNickname: "아이디는 영문, 숫자 포함 6-10글자입니다"
      }));
      flag = false;
    } else {
      this.setState(() => ({ errorNickname: "" }));
      flag = true;
    }
    if (this.state.password === "") {
      this.setState(() => ({ errorPassword: "비밀번호를 작성해주세요" }));
      flag = false;
    } else if (!regTypePW.test(this.state.password)) {
      this.setState(() => ({
        errorPassword:
          "비밀번호는 영문 및 숫자 혹은 특수문자 포함 6-20글자입니다"
      }));
      flag = false;
    } else {
      this.setState(() => ({ errorPassword: "" }));
      flag = true;
    }
    if (this.state.password !== this.state.password_CHECK) {
      this.setState(() => ({ errorCheck: "비밀번호가 일치하지 않습니다" }));
      flag = false;
    } else {
      this.setState(() => ({ errorCheck: "" }));
      flag = true;
    }
    if (
      this.state.nickname === "" ||
      this.state.password === "" ||
      this.state.password_CHECK === ""
    ) {
      flag = false;
    }
    return flag;
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["coral", "#f44283", "#f441bb", "#8341f4"]}
          style={styles.backGround}
        >
          <SignUpTitle />
          <KeyboardAvoidingView
            style={styles.KeyboardAvoidingViewStyle}
            behavior="padding"
            enabled
          >
            <InputBars changeErr={this._changeErr} errorMsg={this._errorMsg} />
          </KeyboardAvoidingView>
          <View style={styles.buttonHouse}>
            <Button
              title=" Submit"
              color="white"
              alignText="center"
              buttonStyle={{ width: "100%", backgroundColor: "deeppink" }}
              containerViewStyle={{ width: "100%" }}
              onPress={this._submit}
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "pink"
              }}
            />
            <Button
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "pink"
              }}
              title=" SignIn "
              color="white"
              alignText="center"
              buttonStyle={{
                width: "100%",
                backgroundColor: "mediumturquoise"
              }}
              containerViewStyle={{ width: "100%" }}
              onPress={() => {
                this.props.navigation.navigate("SignIn");
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
                  아이디가 이미 존재합니다{" "}
                </Text>
                <Button
                  title=" close "
                  color="black"
                  onPress={() => {
                    this._setModalVisible(!this.state.modalVisible);
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
    flex: 1,
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
    justifyContent: "space-between",
    width: "100%",
    left: 0,
    right: 0,
    top: 0
  },
  title: {
    paddingTop: "15%",
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
    height: 70,
    width: 35,
    padding: 5,
    paddingBottom: 13
  },

  btnImage: {
    marginTop: "0%",
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  },

  buttonHouse: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-evenly",
    // alignItems: "center",
    width: "100%",
    marginBottom: "5%"
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
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: "solid",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  }
});
