import React, { Fragment, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Input, Button, ButtonGroup } from "react-native-elements";
import { LinearGradient } from "expo";
import { url } from "../../url";

class Title extends Component {
  render() {
    let currentStyle = this.props.active ? styles.titleActive : styles.titleInactive;
    return (
      <View>
        <Text style={[styles.title, currentStyle]}>{this.props.name}</Text>
      </View>
    );
  }
}

export default class SetStore extends Component {
  flag = false;

  state = {
    buttons: ["그린라이트", "한신포차", "삼거리포차", "베라"],
    selectedIndex: null,

    presentStore: null,
    presentStoreNum: null,
    //여기부터가 팀생성을 위해 서버에 보내는 데이터
    image: null,
    sex: this.props.navigation.state.params.sex,
    teamname: this.props.navigation.state.params.teamname,
    count: this.props.navigation.state.params.count,
    averageAge: this.props.navigation.state.params.averageAge,
    comment: this.props.navigation.state.params.comment,
    presentDistrict: this.props.navigation.state.params.presentDistrict,
    presentDistrictNum: this.props.navigation.state.params.presentDistrictNum,
    userId: this.props.navigation.state.params.userId,

    data: {
      sex: this.props.navigation.state.params.sex,
      count: this.props.navigation.state.params.count,
      age: this.props.navigation.state.params.averageAge,
      comment: this.props.navigation.state.params.comment,
      teamname: this.props.navigation.state.params.teamname,
      locationId: this.props.navigation.state.params.presentDistrictNum,
      userId: this.props.navigation.state.params.userId
    }
  };

  _updateIndex = selectedIndex => {
    this.setState({
      selectedIndex,
      presentStore: this.state.buttons[selectedIndex],
      presentStoreNum: selectedIndex + 1,
      data: {
        sex: this.state.sex,
        count: this.state.count,
        age: this.state.averageAge,
        comment: this.state.comment,
        teamname: this.state.teamname,

        locationId: selectedIndex + 1,
        userId: this.state.userId
      }
    });
  };

  _goDistrict = () => {
    const { data } = this.state;
    console.log(this.state.data, "data setStore!!!!! 69 Lines");
    this.props.navigation.navigate("SetTeamPicture1", { data });
  };

  _submit = () => {
    fetch(`${url}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(this.state.data)
    }).then(async res => {
      // console.log(res._v, "resBody setStore 85 line");
      if (res.ok) {
        console.log("--------Set Information success---------", res.ok);

        flag = true;
        //팀정보를 모두 AsyncStorage에 토큰에 저장한다.
        // 그래야 어플껐다가 재접속해도 데이터베이스에 locationId를 보내주고 그 값을 비교하여 District로 바로 접근할 수 있다.

        const teamInfo = JSON.parse(res._bodyInit);
        console.log(teamInfo, "teamInfo setStore.js 91 lines");
        await this.setState({
          data: {
            teamId: teamInfo.id
          }
        });

        //userToken에 들어가는 순서 sex, count, age, comment, teamname, locationId, userId

        //사진 제출하면 District로 보내고 data안에 있는 teamuserId를 이용하여 관련 데이터를 가져온다.
        await this._goDistrict();
      } else {
        console.log("--------Set Information fail---------", res.ok);
        alert("입장에 실패하였습니다.");
        flag = false;
      }
    });
  };

  componentDidMount = () => {};

  render() {
    const presentDistrict = this.props.navigation.state.params.presentDistrict;

    const { buttons, presentStore, selectedIndex } = this.state;
    return (
      <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
        <View style={styles.container}>
          <View style={styles.titleHouse}>
            <Title name="현재 위치를 설정해주세요" style={styles.title} />
            <Title name={presentDistrict} style={styles.title} active={true} />
          </View>
          <View style={styles.storeLists}>
            <ButtonGroup
              onPress={this._updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 50 }}
            />
          </View>
          <View style={styles.buttonHouse}>
            <Button
              title="Next"
              color="white"
              onPress={() => {
                presentStore ? this._submit() : alert("위치를 설정해주세요");
              }}
              containerStyle={{ height: "100%" }}
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
  titleHouse: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15%",
    height: "100%",
    width: "100%"
  },
  title: {
    paddingTop: "5%",
    height: "100%",
    width: "100%",
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  titleActive: {
    color: "purple"
  },
  titleInactive: {
    color: "white"
  },
  storeLists: {
    flex: 0.6,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: "25%",
    color: "white",
    height: "50%",
    width: "100%"
  },
  buttonHouse: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    height: "100%"
  }
});
