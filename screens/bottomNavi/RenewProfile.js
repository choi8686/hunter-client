import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { Input, Button, ButtonGroup } from "react-native-elements";
import IconBadge from "react-native-icon-badge";

import { url } from "../../url";

//district 버튼
class ButtonsGroup1 extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonsDistrict: ["홍대입구역", "이태원역", "강남역", "건대입구역"],
      districtName: null,
      districtId: null,
      selectedIndex: null
    };
    this._getUserToken();
  }

  _getUserToken = async () => {
    userToken = await AsyncStorage.getItem("userToken");
    userTokenArr = userToken.split("-");
    this.setState({
      //userTokenArr.length-4는 DistrictId 를 뜻함.
      selectedIndex: Number(userTokenArr[userTokenArr.length - 4]) - 1
    });
  };

  _updateIndexDistrict = selectedIndex => {
    this.setState({
      selectedIndex,
      storeName: this.state.buttonsDistrict[selectedIndex],
      districtId: selectedIndex + 1
    });
    this.props._updateIndex_D(selectedIndex);
  };

  render() {
    const { selectedIndex, buttonsDistrict } = this.state;
    return (
      <ButtonGroup
        onPress={this._updateIndexDistrict}
        selectedIndex={selectedIndex}
        buttons={buttonsDistrict}
        containerStyle={{ height: 50 }}
      />
    );
  }
}

//store 버튼
class ButtonsGroup2 extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonsStore: ["그린라이트", "한신포차", "삼거리포차", "베라"],
      storeName: null,
      storeId: null,
      selectedIndex: null
    };
    this._getUserToken();
  }

  _getUserToken = async () => {
    userToken = await AsyncStorage.getItem("userToken");
    userTokenArr = userToken.split("-");
    this.setState({
      //userTokenArr.length-3는 storeId 를 뜻함.
      selectedIndex: Number(userTokenArr[userTokenArr.length - 3]) - 1
    });
  };

  _updateIndexStore = selectedIndex => {
    this.setState({
      selectedIndex,
      storeName: this.state.buttonsStore[selectedIndex],
      storeId: selectedIndex + 1
    });
    this.props._updateIndex_S(selectedIndex);
  };

  render() {
    const { selectedIndex, buttonsStore } = this.state;
    return (
      <ButtonGroup
        onPress={this._updateIndexStore}
        selectedIndex={selectedIndex}
        buttons={buttonsStore}
        containerStyle={{ height: 50 }}
      />
    );
  }
}

export default class RenewProfile extends React.Component {
  //개인 프로필창을 클릭 시, 제일 먼저 실행되는 함수! 데이터베이스에서 개인프로필에 대한 정보를 가져온다.

  constructor() {
    super();
    //ㅇㅏ래 함수는 componentDidmount가 실행되기 전에 필요한 데이터들을 미리 정의시키져주기 위함이다.
    this._getUserToken();
  }

  _getUserToken = async () => {
    userToken = await AsyncStorage.getItem("userToken");
    userTokenArr = userToken.split("-");
    this.setState({
      sex: userTokenArr[userTokenArr.length - 9],
      count: userTokenArr[userTokenArr.length - 8],
      age: userTokenArr[userTokenArr.length - 7],
      comment: userTokenArr[userTokenArr.length - 6],
      teamname: userTokenArr[userTokenArr.length - 5],
      districtId: userTokenArr[userTokenArr.length - 4],
      storeId: userTokenArr[userTokenArr.length - 3],
      userId: userTokenArr[userTokenArr.length - 2],
      id: userTokenArr[userTokenArr.length - 1],
      selectedIndex: userTokenArr[userTokenArr.length - 4]
    });
  };

  state = {
    imageFlag: false,

    buttonsDistrict: ["홍대입구역", "이태원역", "강남역", "건대입구역"],
    districtName: null,
    districtId: null,

    buttonsStore: ["그린라이트", "한신포차", "삼거리포차", "베라"],
    storeName: null,
    storeId: null,

    sex: null,
    count: null,
    age: null,
    comment: null,
    teamname: null,

    userId: null,

    id: null
  };
  //district 수정
  _updateIndex_D = selectedIndex => {
    this.setState({
      districtName: this.state.buttonsDistrict[selectedIndex],
      districtId: selectedIndex + 1
    });
  };

  //store 수정
  _updateIndex_S = selectedIndex => {
    this.setState({
      storeName: this.state.buttonsStore[selectedIndex],
      storeId: selectedIndex + 1
    });
  };

  _changeProfilePicture = () => {
    console.log("ok change your Profile Picture");
  };

  //프로필을 수정할 때 필요한 함수
  _renewProfileData = async () => {
    const {
      sex,
      count,
      age,
      comment,
      teamname,
      districtId,
      storeId,
      userId,
      id
    } = await this.state;

    count.length !== 0 &&
    age.length !== 0 &&
    comment.length !== 0 &&
    teamname.length !== 0 &&
    districtId.length !== 0 &&
    storeId.length !== 0 &&
    userId.length !== 0
      ? fetch(`${url}/teams/change`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            count: count,
            age: age,
            comment: comment,
            teamname: teamname,
            districtId: districtId,
            storeId: storeId,
            userId: userId
          })
        }).then(async res => {
          console.log(res, "res =>  RenewProfile.js 211 Lines ");
          if (res.ok) {
            console.log("--------Renew success---------", res.ok);
            flag = true;

            AsyncStorage.removeItem("userToken");

            //여기서  AsyncStorage에 새로 수정한 내용들을 다시 담는다.!!!!!!!!!!!

            await AsyncStorage.setItem(
              "userToken",
              "aasertetdbc" +
                "-" +
                sex +
                "-" +
                count +
                "-" +
                age +
                "-" +
                comment +
                "-" +
                teamname +
                "-" +
                districtId +
                "-" +
                storeId +
                "-" +
                userId +
                "-" +
                id
            );

            let userToken2 = await AsyncStorage.getItem("userToken");
            console.log(userToken2, "userToken2!!!!!!~~~~~~~~");
          } else {
            console.log("--------Renew fail---------", res.ok);
            flag = false;
          }
        })
      : alert("정보를 빠드리지 말고 입력해주세요");
  };

  // 개인프로필정보를 onChange를 통해 바꾸는 함수
  _changeTeamNameValue = e => {
    this.setState({
      teamname: e.nativeEvent.text
    });
  };

  _changeCommentValue = e => {
    this.setState({
      comment: e.nativeEvent.text
    });
  };

  _changeAgeValue = e => {
    this.setState({
      age: e.nativeEvent.text
    });
  };

  _changeCountValue = e => {
    this.setState({
      count: e.nativeEvent.text
    });
  };

  _changeCommentValue = e => {
    this.setState({
      comment: e.nativeEvent.text
    });
  };

  componentDidMount = () => {};

  render() {
    const { imageFlag, buttonsDistrict, buttonsStore } = this.state;

    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          backgroundColor: "#222222"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10%"
          }}
        >
          {/* 프로필 사진을 가져와서 띄워준다.  */}
          {/* 사진옆에 수정버튼을 누르면 사진의 수정이 가능하다. => 수정하게 될 경우, S3로 쏴주고 그 사진을 다시 불러온다.   */}
          {imageFlag ? null : (
            <TouchableOpacity onPress={this._changeProfilePicture}>
              <IconBadge
                MainElement={
                  <Image
                    source={{
                      uri:
                        "http://img1.daumcdn.net/thumb/C246x358/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmovie%2F91340b7a23541ea5697f7d765948446e75e40f7b"
                    }}
                    style={styles.avatar}
                  />
                }
                BadgeElement={
                  <View>
                    <Text style={{ color: "ghostwhite", fontSize: 15 }}>
                      {" + "}
                    </Text>
                  </View>
                }
                IconBadgeStyle={{
                  width: 30,
                  height: 30,
                  backgroundColor: "rgba(0, 0, 0, 0.3)"
                }}
                Hidden={this.state.BadgeCount == 0}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* 스크롤뷰는 아래부터 */}
        <View
          style={{
            flex: 5,
            width: "100%",
            alignItems: "center",
            backgroundColor: "gainsboro"
          }}
        >
          <ScrollView style={{ width: "85%", height: "100%" }}>
            <View style={styles.scrollBox}>
              <View style={styles.buttonBox}>
                <Text style={{ paddingBottom: 5 }}>지역명</Text>
                <ButtonsGroup1
                  _updateIndex_D={this._updateIndex_D}
                  buttonsDistrict={buttonsDistrict}
                  containerStyle={{ height: 50 }}
                />
              </View>

              <View style={styles.buttonBox}>
                <Text style={{ paddingBottom: 5 }}>상호명</Text>
                <ButtonsGroup2
                  _updateIndex_S={this._updateIndex_S}
                  buttons={buttonsStore}
                  containerStyle={{ height: 50 }}
                />
              </View>

              <View style={styles.infoBox}>
                <Text style={{ paddingBottom: 5 }}>팀이름</Text>
                {/* 팀이름 */}
                <Input
                  containerStyle={{}}
                  value={this.state.teamname}
                  onChange={this._changeTeamNameValue}
                  leftIcon={{ type: "font-awesome", name: "chevron-right" }}
                />
              </View>

              <View style={styles.infoBox}>
                <Text style={{ paddingBottom: 5 }}>인원수</Text>
                {/* 인원수 */}
                <Input
                  containerStyle={{}}
                  value={this.state.count}
                  onChange={this._changeCountValue}
                  leftIcon={{ type: "font-awesome", name: "chevron-right" }}
                />
              </View>

              <View style={styles.infoBox}>
                <Text style={{ paddingBottom: 5 }}>평균나이</Text>
                {/* 평균나이 */}
                <Input
                  containerStyle={{}}
                  value={this.state.age}
                  onChange={this._changeAgeValue}
                  leftIcon={{ type: "font-awesome", name: "chevron-right" }}
                />
              </View>

              <View style={styles.infoBox}>
                <Text style={{ paddingBottom: 5 }}>필살멘트</Text>
                {/* 코멘트 */}
                <Input
                  style={{ height: 50, width: 300 }}
                  value={this.state.comment}
                  onChange={this._changeCommentValue}
                  placeholder="INPUT WITH ICON"
                  leftIcon={{ type: "font-awesome", name: "chevron-right" }}
                />
              </View>

              <Button
                title="Submit "
                color="black"
                alignItems="center"
                onPress={this._renewProfileData}
              />
            </View>
          </ScrollView>
        </View>
      </View>
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
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },
  buttonGroup: {
    flex: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%"
  },
  button: {
    backgroundColor: "#7FC18A"
  },
  headerRightIcon: {
    marginRight: 15
  },
  scrollBox: {
    height: 1000,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "10%",
    paddingBottom: "20%",
    paddingVertical: 20
  },
  buttonBox: {
    flex: 1,
    flexDirection: "column",
    marginBottom: "5%",
    paddingVertical: 10,
    paddingTop: "5%",
    color: "white",
    height: "100%",
    width: "100%"
  },
  infoBox: {
    flex: 1,
    flexDirection: "column",
    marginBottom: "5%",
    paddingVertical: 10
  }
});
