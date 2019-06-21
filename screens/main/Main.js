import React, { Fragment, Component } from "react";
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
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

export default class Main extends Component {
  constructor() {
    super();
    // this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  // 처음 접속시, userToken이 있으면 database에서 나의 해당정보를 가져오고 그 정보를 가지고 DistrictScreen에 접속한다.
  // 데이터 베이스에서 해당정보를 가지고 와야 홍대의 사람들을 보여줄지, 이태원의 사람들을 보여줄지 그리고 또 홍대의 그린라이트를 보여줄지, 한신포차를 보여줄지 알 수 있다.
  _bootstrapAsync = async () => {
    if ((await AsyncStorage.getItem("userToken")) !== null) {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log(userToken, "userToken@@@@@@@@");
      const userTokenArr = userToken.split("-");
      "aasertetdbc" +
        sex +
        count +
        age +
        comment +
        teamname +
        districtId +
        storeId +
        userId;
      //유저의 아이디
      const userId = userTokenArr[userTokenArr.length - 1];
      const storeId = userTokenArr[userTokenArr.length - 2];
      const districtId = userTokenArr[userTokenArr.length - 3];
      const teamname = userTokenArr[userTokenArr.length - 4];
      const comment = userTokenArr[userTokenArr.length - 5];
      const age = userTokenArr[userTokenArr.length - 6];
      const count = userTokenArr[userTokenArr.length - 7];
      const sex = userTokenArr[userTokenArr.length - 8];
      //team아디
      const id = userTokenArr[userTokenArr.length - 9];

      this.props.navigation.navigate("Home", {
        userId,
        storeId,
        districtId,
        teamname,
        comment,
        age,
        count,
        sex,
        id
      });
    } else {
      this.props.navigation.navigate("SignIn");
    }
  };

  goSignUp = () => {
    goSignUpCallBack = () => {
      this._bootstrapAsync();
    };
    setTimeout(goSignUpCallBack, 2000);
  };
  componentDidMount = () => {
    this.goSignUp();
  };
  render() {
    return (
      <LinearGradient
        colors={["coral", "#f44283", "#f441bb", "#8341f4"]}
        style={styles.backGround}
      >
        <View style={styles.titleHouse}>
          <Title name="  저기 어때 " />
          <Image
            source={require("../../logo/Logo.png")}
            style={{ height: "15%", width: "15%" }}
          />
        </View>

        <View style={styles.buttonHouse}>
          <Button
            title="Loading"
            type="clear"
            titleStyle={{ color: "white" }}
            buttonStyle={{}}
          />
          <Button
            loading
            type="clear"
            loadingProps={{ size: "small", color: "white" }}
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
            underlayColor="transparent"
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    paddingTop: "30%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    left: 0,
    right: 0,
    top: 0
  },
  titleHouse: {
    flex: 0.8,
    marginTop: "20%",
    height: 800,

    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "white",
    margin: 5
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold"
  },
  buttonHouse: {
    flex: 0.2
  }
});
