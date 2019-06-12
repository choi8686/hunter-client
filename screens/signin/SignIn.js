import React, { Fragment, Component } from "react";
import { StyleSheet, Text, AsyncStorage, View, Modal, KeyboardAvoidingView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { LinearGradient, Constants } from "expo";

// 제목
class SignInTitle extends Component {
  render() {
    return <Text style={styles.title}>SignIn</Text>;
  }
}

//로그인 입력창
class InputBars extends Component {
  render() {
    const { changeErr, errorMsg } = this.props;
    return (
      <View style={styles.inputContainer}>
        <Input
          placeholder="   ID required"
          textAlign={"center"}
          leftIcon={{ type: "font-awesome", name: "user" }}
          containerStyle={{ width: "90%" }}
          clearButtonMode="always"
          onChangeText={text => changeErr("nickname", "errorNickname", text)}
        />
        {errorMsg("errorNickname")}
        <Input
          placeholder="   PASSWORD required"
          textAlign={"center"}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          containerStyle={{ width: "90%" }}
          clearButtonMode="always"
          onChangeText={text => changeErr("password", "errorPassword", text)}
        />
        {errorMsg("errorPassword")}
      </View>
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
      fetch("http://13.124.131.38:3000/users/login", {
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
          console.log("--------login success---------", res.ok);
          flag = true;
          await this.setState({
            userId: JSON.parse(res._bodyInit).id
          });
          this._signInAsync();
        } else {
          console.log("--------login fail---------", res.ok);
          flag = false;
          this.setModalVisible(true);
        }
      });
    }
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

  //로그인 성공시, userToken 저장하고 ChooseSex로 보내주는 함수
  _signInAsync = async () => {
    userId = this.state.userId;

    //asyncstorage의 userToken에 userId를 같이 저장하여 어떤 screen에서든 userId를 통해 데이터베이스에서 정보를 가져올 수 있게 한다.
    await AsyncStorage.setItem("userToken", "aasertetdbc" + "-" + userId);
    this.props.navigation.navigate("ChooseSex", { userId });
  };

  // 에러메세지 띄우는 함수
  _errorMsg = check => {
    const state = this.state;
    if (!!state[check]) {
      return <Text style={{ color: "white" }}>{state[check]}</Text>;
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
        <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
          <SignInTitle style={styles.title} />

          <KeyboardAvoidingView style={styles.KeyboardAvoidingViewStyle} behavior="padding" enabled>
            <InputBars changeErr={this._changeErr} errorMsg={this._errorMsg} />
          </KeyboardAvoidingView>

          <View style={styles.buttonHouse}>
            <Button
              title=" LetsGo"
              color="white"
              style={styles.nextButton}
              icon={{ type: "font-awesome", name: "check-circle", color: "pink", marginBottom: "5%" }}
              onPress={this._submit}
            />
            <Button
              icon={{ type: "font-awesome", name: "check-circle", color: "pink" }}
              title=" SignUp"
              color="white"
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
                <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", padding: 15 }}>
                  {" "}
                  아이디 혹은 비밀번호를 확인해주세요{" "}
                </Text>
                <Button
                  title="close "
                  color="black"
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
    left: 0,
    right: 0,
    top: 0
  },
  title: {
    marginTop: "10%",
    flex: 0.2,
    flexDirection: "column",
    color: "white",
    fontSize: 30
  },
  KeyboardAvoidingViewStyle: { flex: 0.5, width: "100%", paddingTop: Constants.statusBarHeight },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
    width: "100%",
    fontSize: 20
  },
  buttonHouse: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
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
