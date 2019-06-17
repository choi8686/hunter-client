import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  icon
} from "react-native";

import {
  Input,
  Icon,
  Button,
  SearchBar,
  ButtonGroup
} from "react-native-elements";
import IconBadge from "react-native-icon-badge";

import { url } from "../../url";

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
    selectedIndex: null,

    buttonsStore: ["그린라이트", "한신포차", "삼거리포차", "베라"],
    storeName: null,
    storeId: null,
    selected: null,

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
      selectedIndex,
      districtName: this.state.buttonsDistrict[selectedIndex],
      districtId: selectedIndex + 1
    });
  };

  //store 수정
  _updateIndex_S = selected => {
    this.setState({
      selected,
      storeName: this.state.buttonsStore[selected],
      storeId: selected + 1
    });
  };

  //개인의 유저 id 를 통해 데이터를 끌고 오는게 먼저!
  _bringProfileData = () => {
    //JWT
    fetch(`${url}/users/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${JWT}`
      }
    }).then(async res => {
      if (res.ok) {
        await this.setState({
          userId: JSON.parse(res._bodyInit).userInfo.id
        });

        fetch(`${url}/teams/getUserIdTeam/` + this.state.userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(async res => {
          if (res.ok) {
            console.log(
              JSON.parse(res._bodyInit),
              "teamInfo SignIn.js Lines:113"
            );
            if (JSON.parse(res._bodyInit)) {
              await this.setState({
                teamInfo: JSON.parse(res._bodyInit).teams[0]
              });
            }
          }
        });
      }
    });
  };

  _changeProfilePicture = () => {
    console.log("ok change your Profile Picture");
  };

  _saveNewProfile = () => {
    console.log("_saveNewProfile");
  };
  //프로필을 수정할 때 필요한 함수
  _renewProfileData = () => {
    fetch(`${url}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    }).then(async res => {
      if (res.ok) {
        console.log("--------Renew success---------", res.ok);
        flag = true;
        await this.setState({
          //여기서 state에 새로 수정한 내용들을 다시 담는다.
        });
        this._signInAsync();
      } else {
        console.log("--------Renew fail---------", res.ok);
        flag = false;
      }
    });
  };

  // 개인프로필정보를 onChange를 통해 바꾸는 함수
  _changeTeamNameValue = e => {
    console.log(e, "!!!!!!!!!!!");

    this.setState({
      teamname: e
    });
  };

  _changeCommentValue = e => {
    this.setState({
      comment: e.nativeEvent.value
    });
  };

  _changeAgeValue = e => {
    this.setState({
      age: e.nativeEvent.value
    });
  };

  _changeCountValue = e => {
    this.setState({
      count: e.nativeEvent.value
    });
  };

  componentDidMount = () => {};

  render() {
    const {
      imageFlag,
      selectedIndex,
      selected,
      buttonsDistrict,
      buttonsStore
    } = this.state;
    return (
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
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

        {/* <Text
          style={{
            fontSize: 35,
            textAlign: "center",
            marginTop: "5%",
            marginBottom: "5%"
          }}
        >
          Who we Are?
        </Text> */}

        {/* 스크롤뷰는 아래부터 */}
        <View
          style={{
            flex: 5,
            width: "100%",
            alignItems: "center",
            backgroundColor: "gainsboro"
          }}
        >
          <ScrollView style={{ width: "85%" }}>
            <View style={styles.scrollBox}>
              <View style={styles.buttonBox}>
                <Text style={{ paddingBottom: 5 }}>지역명</Text>
                <ButtonGroup
                  onPress={this._updateIndex_D}
                  selectedIndex={selectedIndex}
                  buttons={buttonsDistrict}
                  containerStyle={{ height: 50 }}
                />
              </View>

              <View style={styles.buttonBox}>
                <Text style={{ paddingBottom: 5 }}>상호명</Text>
                <ButtonGroup
                  onPress={this._updateIndex_S}
                  selected={selected}
                  buttons={buttonsStore}
                  containerStyle={{ height: 50 }}
                />
              </View>
              {/*
              <View style={styles.infoBox}>
                <Text style={{ paddingBottom: 5 }}>팀이름</Text>
                <SearchBar
                  noIcon
                  lightTheme
                  value={this.state.teamname}
                  onChangeText={this._changeTeamNameValue}
                  noIcon
                />
              </View> */}

              <View style={styles.infoBox}>
                <Text style={{ paddingBottom: 5 }}>팀이름</Text>
                {/* 인원수 */}
                <Input
                  containerStyle={{}}
                  value={this.state.teamname}
                  onChangeText={this._changeTeamNameValue}
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
                onPress={this._saveNewProfile}
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
    height: 700,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "10%",
    paddingBottom: "20%",
    paddingVertical: 10
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
