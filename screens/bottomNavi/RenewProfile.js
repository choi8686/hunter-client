import React from "react";

// import RenewPicture from "./RenewPicture";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Input, Button, ButtonGroup } from "react-native-elements";
import IconBadge from "react-native-icon-badge";
import { url } from "../../url";

let pickerResult = null;

//그려주기만 하는 RenewProfile =>  RenewPrivateInfo 와 RenewProfile은 setState가 변할때마다 서로 영향을 끼치므로 이것을 배제하기 위해
//그려주기만하는 RenwProfile을 새로 만들어준다.

export default class RenewProfile extends React.Component {
  constructor() {
    super();
  }

  state = {};
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
          justifyContent: "space-around",
          backgroundColor: "#222222"
        }}
      >
        <RenewPicture />
        <RenewPrivateInfo props={this.props} />
      </View>
    );
  }
}

class RenewPicture extends React.Component {
  constructor() {
    super();
  }

  state = {
    userId: null,

    id: null,

    images: {
      0: null,
      1: null,
      2: null
    }
  };

  //유저토큰 가져와서 스테이트에 저장
  _getUserToken = async () => {
    userToken = await AsyncStorage.getItem("userToken");
    userTokenArr = userToken.split("-");
    await this.setState({
      // sex: userTokenArr[userTokenArr.length - 9],
      // count: userTokenArr[userTokenArr.length - 8],
      // age: userTokenArr[userTokenArr.length - 7],
      // comment: userTokenArr[userTokenArr.length - 6],
      // teamname: userTokenArr[userTokenArr.length - 5],
      // districtId: userTokenArr[userTokenArr.length - 4],
      // storeId: userTokenArr[userTokenArr.length - 3],
      userId: userTokenArr[userTokenArr.length - 2],
      id: userTokenArr[userTokenArr.length - 1]
      // selectedIndex: userTokenArr[userTokenArr.length - 4]
    });
  };

  // 프로필 사진 가져오는 함수 => 제일 상단에 저장되어있던 자신의 프로필 사진을 띄워준다
  _bringProfilePicture = async myTeamId => {
    await fetch(`${url}/upload/${myTeamId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async res => await res.json())
      .then(
        async data =>
          await data.map((ele, index) => {
            let images = this.state.images;
            images[index] = ele.imgUrl;
            console.log(
              images,
              "complete images take in renewProfile.js line 99"
            );
            this.setState({
              images: images
            });
          })
      );
  };

  //image 클릭해서 해당 이미지 수정하는 함수
  _pickImage = async num => {
    console.log("pick!!! Image!!!!");
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === "granted") {
      console.log("picking image@@@@@@@@@");
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [5, 7]
      });

      console.log(pickerResult, "pickerResult");
      if (pickerResult.cancelled === false) {
        let images = this.state.images;
        console.log("1 ######", images);
        images[num] = pickerResult.uri;

        console.log("2 ###### ", images);

        await this.setState({ images: images });

        console.log("3 ###### ", images);

        await this._handleImagePicked(pickerResult, num, images);
      }
    }
  };

  // S3에 이미지 upload하는 함수
  _uploadImageAsync = async (uri, num) => {
    let apiUrl = `${url}/upload`;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    console.log(this.state.id, num);

    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `${this.state.id}-${num}.${fileType}`,
      type: `image/${fileType}`
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        teamId: this.state.id
      }
    };

    return await fetch(apiUrl, options).then(res =>
      console.log("upload response", res)
    );
  };

  //이미지 순차적으로 upload실행요청하는 함수
  _handleImagePicked = async (pickerResult, num, images) => {
    let uploadResponse, uploadResult;

    try {
      if (!pickerResult.cancelled) {
        await this._uploadImageAsync(this.state.images[num], num + 1);
      }
    } catch (e) {
      console.log({ uploadResponse });

      Alert.alert(" 잠시 후에 다시 시도해주세요. ");
    } finally {
      console.log("upload!");
    }
  };

  componentDidMount = async () => {
    // teamId가 있어야 사진을 가져올 수 있이게  토큰을 먼저 열어서 그로부터 teamId 를 받아서와서 그 아이디를 서버에 요청하여
    // 사진을 받아온다. userTokenArr[userTokenArr.length - 1] => teamId를 뜻함
    await this._getUserToken();
    if (this.state.id) {
      await this._bringProfilePicture(this.state.id);
    }
  };

  render() {
    const { images } = this.state;
    const firstImage = images[0];
    const secondImage = images[1];
    const thirdImage = images[2];
    return (
      <View style={styles.ImagesHouse}>
        <TouchableOpacity onPress={() => this._pickImage(0)}>
          <View>
            {firstImage !== null ? (
              <IconBadge
                MainElement={
                  <Image
                    source={{
                      uri: firstImage + "?" + new Date().getTime()
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
            ) : (
              <Button
                loading
                type="clear"
                style={styles.avatar}
                loadingProps={{ size: "small", color: "white" }}
                underlayColor="transparent"
                onPress={() => this._pickImage(0)}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._pickImage(1)}>
          <View>
            {secondImage !== null ? (
              <IconBadge
                MainElement={
                  <Image
                    // key={Math.random()}
                    source={{
                      uri: secondImage + "?" + new Date().getTime()
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
            ) : (
              <Button
                loading
                type="clear"
                style={styles.avatar}
                loadingProps={{ size: "small", color: "white" }}
                underlayColor="transparent"
                onPress={() => this._pickImage(1)}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._pickImage(2)}>
          <View>
            {thirdImage !== null ? (
              <IconBadge
                MainElement={
                  <Image
                    // key={Math.random()}
                    source={{
                      uri: thirdImage + "?" + new Date().getTime()
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
            ) : (
              <Button
                loading
                type="clear"
                style={styles.avatar}
                loadingProps={{ size: "small", color: "white" }}
                underlayColor="transparent"
                onPress={() => this._pickImage(2)}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class RenewPrivateInfo extends React.Component {
  //개인 프로필창을 클릭 시, 제일 먼저 실행되는 함수! 데이터베이스에서 개인프로필에 대한 정보를 가져온다.

  constructor() {
    super();
    //ㅇㅏ래 함수는 componentDidmount가 실행되기 전에 필요한 데이터들을 미리 정의시키져주기 위함이다.
    this._getUserToken();
  }

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

    id: null,

    images: {}
  };

  //유저토큰 가져와서 스테이트에 저장
  _getUserToken = async () => {
    userToken = await AsyncStorage.getItem("userToken");
    userTokenArr = userToken.split("-");

    await this.setState({
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

  //submit 버튼 누를 시, 프로필을 수정하기 위해 필요한 함수
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
    } = this.state;

    count.length !== 0 &&
    age.length !== 0 &&
    Number(age) >= 20 &&
    comment.length !== 0 &&
    teamname.length !== 0 &&
    districtId.length !== 0 &&
    storeId.length !== 0 &&
    userId.length !== 0
      ? await fetch(`${url}/teams/change`, {
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
            //props의 props를 받았기에 아래처럼 작성해주어야 한다.
            this.props.props.navigation.navigate("SettingHome");
          } else {
            console.log("--------Renew fail---------", res.ok);
            flag = false;
          }
        })
      : this.state.age < 20
      ? Alert.alert("나이는 20살 이상이어야 합니다.")
      : Alert.alert("정보를 정확히 입력해주세요");
  };

  // 개인프로필정보를 onChange를 통해 바꾸는 함수
  _changeTeamNameValue = e => {
    this.setState({
      teamname: e.nativeEvent.text
    });
  };

  // 개인 comment 정보를 바꾸는 함수
  _changeCommentValue = e => {
    this.setState({
      comment: e.nativeEvent.text
    });
  };

  // 나이를 바꾸는 함수 20 살 이상이어여 한다.
  _changeAgeValue = e => {
    if (Number(e.nativeEvent.text) - e.nativeEvent.text === 0) {
      this.setState({
        age: e.nativeEvent.text
      });
    } else {
      Alert.alert("나이를 정확히 기입해주세요");
    }
  };

  _changeCountValue = e => {
    if (
      Number(e.nativeEvent.text) - e.nativeEvent.text == 0 &&
      Number(e.nativeEvent.text) <= 4
    ) {
      this.setState({
        count: e.nativeEvent.text
      });
    } else {
      Alert.alert("인원 수는 0~4인 이어야 합니다.");
    }
  };

  _changeCommentValue = e => {
    this.setState({
      comment: e.nativeEvent.text
    });
  };

  componentDidMount = () => {};

  render() {
    const { imageFlag, buttonsDistrict, buttonsStore, images } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior="padding"
        keyboardShouldPersistTaps="always"
        enabled
        keyboardVerticalOffset={105}
      >
        <ScrollView style={{ width: "90%", height: "100%" }}>
          <View style={styles.scrollBox}>
            <View style={styles.buttonBox}>
              <Text style={{ paddingBottom: 5 }}>지역명</Text>
              <ButtonsGroup1
                //추후에 이태원역, 건대입구역 서비스할 떄, 풀어줘야하는 부분
                // _updateIndex_D={this._updateIndex_D}
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
      </KeyboardAvoidingView>
    );
  }
}

//district 버튼
class ButtonsGroup1 extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonsDistrict: ["홍대입구역", "이태원역", "강남역", "건대입구역"],
      districtName: null,
      districtId: null,
      selectedIndex: 1
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
    if (selectedIndex !== 0) {
      Alert.alert(" 준비중입니다. ");
    }

    // 홍대입구역을 제외한 다른 역도 활성화시, 누르는 index를 지정해주기 위함.
    // this.setState({
    //   selectedIndex,
    //   storeName: this.state.buttonsDistrict[selectedIndex],
    //   districtId: selectedIndex + 1
    // });
    // this.props._updateIndex_D(selectedIndex);
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

// 홍대입구 store 버튼
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

const styles = StyleSheet.create({
  avatarContainer: {
    marginTop: "5%"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  ImagesHouse: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    marginTop: "5%"
  },
  avatar: {
    width: 110,
    height: 110
  },
  keyboardContainer: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    backgroundColor: "gainsboro"
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
    height: 800,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "10%",
    marginBottom: "-7%",
    paddingVertical: 20
  },
  buttonBox: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 5,
    paddingTop: "2%",
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
