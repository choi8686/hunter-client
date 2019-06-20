import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";

import { LinearGradient, ImagePicker, Permissions } from "expo";
import { Input, Button, ButtonGroup } from "react-native-elements";
import IconBadge from "react-native-icon-badge";

import { url } from "../../url";

let pickerResult = null;

export default class RenewProfile extends React.Component {
  //개인 프로필창을 클릭 시, 제일 먼저 실행되는 함수! 데이터베이스에서 개인프로필에 대한 정보를 가져온다.

  constructor() {
    super();
    //ㅇㅏ래 함수는 componentDidmount가 실행되기 전에 필요한 데이터들을 미리 정의시키져주기 위함이다.
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
              "complete images take in renewProfile.js line 69"
            );
            this.setState({
              images: images
            });
          })
      );
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

  //image 클릭해서 해당 이미지 수정하는 함수
  _pickImage = async num => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === "granted") {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [5, 7]
      });

      let images = this.state.images;
      images[num] = pickerResult.uri;
      await this.setState({ images: images });
      this._handleImagePicked(pickerResult, num);
    }
  };

  // S3에 이미지 upload하는 함수
  _uploadImageAsync = async uri => {
    let apiUrl = `${url}/upload`;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileType}`,
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
  _handleImagePicked = async (pickerResult, num) => {
    console.log(pickerResult, "pickerResult!!!!!@@@@@");
    let uploadResponse, uploadResult;
    try {
      // if (!pickerResult.cancelled) {

      await this._uploadImageAsync(this.state.images[num]);
      // await this._uploadImageAsync(this.state.images[1]);
      // await this._uploadImageAsync(this.state.images[2]);
      // }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      Alert.alert(" 잠시 후에 다시 시도해주세요. ");
    } finally {
      // this.props.navigation.navigate("District");
      console.log("upload!");
    }
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
    Number(age) > 20 &&
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

            let userToken2 = await AsyncStorage.getItem("userToken");
            console.log(userToken2, "userToken2!!!!!!~~~~~~~~");
            this.props.navigation.navigate("SettingHome");
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

  componentDidMount = async () => {
    console.log("heheheheh");

    // teamId가 있어야 사진을 가져올 수 있이게  토큰을 먼저 열어서 그로부터 teamId 를 받아서와서 그 아이디를 서버에 요청하여
    // 사진을 받아온다. userTokenArr[userTokenArr.length - 1] => teamId를 뜻함
    await this._getUserToken();
    if (this.state.id) {
      await this._bringProfilePicture(this.state.id);
    }
  };

  render() {
    const { imageFlag, buttonsDistrict, buttonsStore, images } = this.state;

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
          <View style={styles.ImagesHouse}>
            <TouchableOpacity onPress={() => this._pickImage(0)}>
              <View>
                {images[0] !== undefined ? (
                  <IconBadge
                    MainElement={
                      <Image
                        source={{
                          uri:
                            // "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/1561014040509.png"
                            images[0]
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
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._pickImage(1)}>
              <View>
                {images[1] !== undefined ? (
                  <IconBadge
                    MainElement={
                      <Image
                        source={{
                          uri:
                            // "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/1561014041237.png"
                            images[1]
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
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._pickImage(2)}>
              <View>
                {images[2] !== undefined ? (
                  <IconBadge
                    MainElement={
                      <Image
                        source={{
                          uri:
                            // "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/1561014041706.png"
                            images[2]
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
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 스크롤뷰는 아래부터 */}
        <View
          style={{
            flex: 3,
            height: "100%",
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
        </View>
      </View>
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
    justifyContent: "center",
    width: "100%"
  },
  ImagesHouse: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%",
    height: "100%"
  },
  avatar: {
    width: 110,
    height: 110
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
