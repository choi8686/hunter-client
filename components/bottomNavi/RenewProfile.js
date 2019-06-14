import React from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import { url } from "../../url";

const { width } = Dimensions.get("window");
export default class RenewProfile extends React.Component {
  //개인 프로필창을 클릭 시, 제일 먼저 실행되는 함수! 데이터베이스에서 개인프로필에 대한 정보를 가져온다.
  //혹은 로그인 했을때부터 data에 props로 계속 가지고 다녀 전달받는다.

  state = {
    sex: null,
    count: null,
    age: null,
    comment: null,
    teamname: null,

    locationId: null,
    userId: null
  };

  //개인의 유저 id 를 통해 데이터를 끌고 오는게 먼저!
  _bringProfileData = () => {
    fetch(`${url}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  _changeProfilePicture = () => {
    console.log("ok change your Profile Picture");
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

  componentDidMount = () => {
    //componentDidMount를 통해 개인 프로필데이터를 가져오는 함수를 실행
    // this._bringProfileData();
  };
  render() {
    console.log()
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "http://cphoto.asiae.co.kr/listimglink/1/2013012413095706640_1.jpg" }}
              style={styles.avatar}
            />
            <TouchableOpacity>
              <Text onPress={this._changeProfilePicture}>이 글은 프로필 사진 수정 버튼!!!</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>여기는 평균나이가 오겠지</Text>
        </View>
        <View>
          <Text>여기는 코멘트가 오겠지</Text>
        </View>
        <View>
          <Text>여기는 코멘트가 오겠지</Text>
        </View>

        {/* <Text style={{ width: width - 50, lineHeight: 20 }}>hello world</Text> */}
      </ScrollView>
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
  }
});
