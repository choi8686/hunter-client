import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo";
import { Avatar, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import TopBarRightIcons from "../../components/bottomNavi/topBarRightIcons";
export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "설정",
      headerBackground: (
        <LinearGradient
          colors={["#514A9D", "#24C6DC"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={{
            flex: 1,
            paddingTop: "20%"
          }}
        />
      ),
      headerTitleStyle: {
        color: "#FAFBFB"
      },
      headerRight: <TopBarRightIcons navigation={navigation} />
    };
  };
  _handleButton = num => {
    switch (num) {
      case 1:
        alert("프로필수정");
        break;
      case 3:
        alert("로그아웃");
        break;
      case 4:
        alert("계정삭제");
    }
  };

  _handleLogOut = async () => {
    AsyncStorage.removeItem("userToken");
    let session = await AsyncStorage.getItem("userToken");
    console.log(session, "세션없냐 개새꺄 SettingScreen.js 35 lines !!!!!!!");
    console.log(this.props);
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      // <LinearGradient
      //   colors={["#10356c", "#a13388"]}
      //   style={{ flex: 1 }}
      //   start={{ x: 0, y: 0 }}
      //   end={{ x: 1, y: 0 }}
      // >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          backgroundColor: "#222222",
          padding: "5%"
        }}
      >
        <TouchableOpacity onPress={() => alert("고민하지 말고 직진!")}>
          <Image source={require("../../logo/Logo.png")} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={styles.buttonGroup}>
            <Button
              title="정보수정"
              titleStyle={{ color: "ghostwhite" }}
              // type="outline"
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "deeppink",
                marginBottom: "5%"
              }}
              onPress={() => {
                this.props.navigation.navigate("RenewProfile");
              }}
              containerViewStyle={{ width: "100%" }}
              buttonStyle={{ width: "100%", backgroundColor: "#3A4044" }}
            />
            <Button
              title="이용약관"
              // type="outline"
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "deeppink",
                marginBottom: "5%"
              }}
              onPress={() => this.props.navigation.navigate("Conditions")}
              containerViewStyle={{ width: "100%" }}
              buttonStyle={{ width: "100%", backgroundColor: "#3A4044" }}
            />
            <Button
              title="로그아웃"
              // type="outline"
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "deeppink",
                marginBottom: "5%"
              }}
              onPress={this._handleLogOut}
              containerViewStyle={{ width: "100%" }}
              buttonStyle={{ width: "100%", backgroundColor: "#3A4044" }}
            />
            <Button
              title="계정삭제"
              // type="outline"
              icon={{
                type: "font-awesome",
                name: "check-circle",
                color: "deeppink",
                marginBottom: "5%"
              }}
              onPress={() => {
                this._handleButton(4);
              }}
              containerViewStyle={{ width: "100%" }}
              buttonStyle={{ width: "100%", backgroundColor: "#3A4044" }}
            />
          </View>
        </View>
      </View>
      // </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginTop: "5%"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-evenly",
    height: "50%",
    width: "100%"
  },
  headerRightIcon: {
    marginRight: 15
  }
});
