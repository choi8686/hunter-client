import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  AsyncStorage
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import TopBarRightIcons from "../../components/bottomNavi/topBarRightIcons";
import { url } from "../../url";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
var loginUser = {};

export default class DistrictScreen extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      teams: [],
      currentIndex: 0,
      pictrueIndex: 0
    };
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.titleOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 1, 1],
      extrapolate: "clamp"
    });

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 4],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 4],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.6, 1],
      extrapolate: "clamp"
    });
  }

  //상단탭 부분_우측상단바관리_윤민수
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backGroundColor: "black" },
      headerTitle: "저기어때",
      color: "ghostwhite",
      headerRight: <TopBarRightIcons navigation={navigation} />
    };
  };

  componentDidMount() {
    this._getTeamsOnDistrict();
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 오른쪽으로 스와이프 할 때
        // gestureState.dx 값이 120보다 크면 함수실행.
        if (gestureState.dx > 120) {
          // 스와이프한 사진이 화면밖으로 나가게 해서 사라지도록 보이게하는 부분
          // start가 실행되면 사라짐
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            //사라진 다음 다음 사진을 0,0 좌표에 set 하는 부분
            this.setState(
              { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
              () => {
                this.position.setValue({ x: 0, y: 0 });
              },
              this._snedToLike()
            );
          });
        }
        // 왼쪽으로 스와이프 할 때
        // gestureState.dx 값이 -120보다 작으면 함수실행.
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState(
              { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
              () => {
                this.position.setValue({ x: 0, y: 0 });
              }
            );
          });
        }
        // 둘다 아니면 실행
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  _getTeamsOnDistrict = async () => {
    // let userToken = await AsyncStorage.getItem("userToken");
    // userToken = userToken.split("-");
    // console.log(userToken, "userToken DistrictScreen 141 lines");
    // console.log(userToken);
    // sex, count, age, comment, teamname, locationId, userId

    // test1 의 토큰을 가져왔다고 가정한다면
    const userToken = "aasertetdbc-1-4-21-qqq-yyy-1-1-1-1".split("-");
    console.log("-----------------TeamGetOnDistrict-----------------");
    // 토큰을 항상 문자열 형태로 가져오기 때문에
    // 유저 정보를 좀더 심플하게 저장할수는 없을까...?
    // 전역에서 loginUser 사용해야하기 때문에 변수타입 선언 안했음
    loginUser = {
      sex: Number(userToken[1]),
      count: Number(userToken[2]),
      age: Number(userToken[3]),
      comment: userToken[4],
      teamname: userToken[5],
      districtId: Number(userToken[6]),
      storeId: Number(userToken[7]),
      userId: Number(userToken[8]),
      teamId: Number(userToken[9])
    };

    // 토큰에 location.district 의 값을 추가해야 할것 같다.. 혁님 파이팅
    fetch(`${url}/teams/district/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .then(teamList =>
        // 접속한 유저와 다른 성별의 팀을 필터하여 setState
        this.setState({
          teams: teamList.filter(list => {
            return loginUser.sex !== list.sex;
          })
        })
      );
  };

  _snedToLike = () => {
    const whoLikeId = loginUser.userId;
    const toLikeId = this.state.teams[this.state.currentIndex].userId;

    fetch(`${url}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        whoLikeId: whoLikeId,
        toLikeId: toLikeId,
        introText: "같은 매장이면 메세지를 볼 수 있습니다."
      })
    });
  };

  _onChangeIndex = e => {
    if (
      e === "rightArrow" &&
      this.state.pictrueIndex <
        this.state.teams[this.state.currentIndex].teamimages.length - 1
    ) {
      this.setState({
        pictrueIndex: this.state.pictrueIndex + 1
      });
    }

    if (e === "leftArrow" && this.state.pictrueIndex > 0) {
      this.setState({
        pictrueIndex: this.state.pictrueIndex - 1
      });
    }
  };

  // _onPressNope = () => {
  //   Animated.spring(this.position, {
  //     toValue: { x: -SCREEN_WIDTH - 100, y: -20 }
  //   }).start(() => {
  //     this.setState(
  //       { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
  //       () => {
  //         this.position.setValue({ x: 0, y: 0 });
  //       }
  //     );
  //   });
  // };

  // _onPressLike = () => {
  //   Animated.spring(this.position, {
  //     toValue: { x: SCREEN_WIDTH + 100, y: -20 }
  //   }).start(() => {
  //     this.setState(
  //       { currentIndex: this.state.currentIndex + 1, pictrueIndex: 0 },
  //       () => {
  //         this.position.setValue({ x: 0, y: 0 });
  //       }
  //     );
  //   });
  // };

  _onPresRefresh = () => {
    this.setState({
      currentIndex: 0,
      pictrueIndex: 0
    });
    this._getTeamsOnDistrict();
  };

  //comment랑 teamname을 가져와서 animation안에 띄워준다.
  renderUsers = () => {
    return this.state.teams
      .map((item, i) => {
        // 스와이프가 인식되면 this.state.currentIndex 1씩 증가
        if (i < this.state.currentIndex) {
          // 이미 넘긴 팀의 카드를 보여주지 않는 부분
          return null;
        } else if (i === this.state.currentIndex) {
          // 맨 윗장에 있는 팀의 상태
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.id}
              style={[
                this.rotateAndTranslate,
                {
                  height: (SCREEN_HEIGHT * 4) / 4,
                  width: SCREEN_WIDTH,
                  margin: 10,
                  paddingBottom: 20,
                  position: "absolute"
                }
              ]}
            >
              <Animated.View
                style={{ opacity: this.likeOpacity, ...styles.likeBorder }}
              >
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: this.dislikeOpacity,
                  ...styles.dislikeBorder
                }}
              >
                <Text style={styles.dislikeText}>NOPE</Text>
              </Animated.View>

              <Image
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                  borderRadius: 20
                }}
                source={{
                  uri: `${item.teamimages[this.state.pictrueIndex].imgUrl}`
                }}
              />

              <Animated.View
                style={{
                  opacity: this.titleOpacity,
                  zIndex: 1000,
                  position: "absolute",
                  marginTop: "96%",
                  height: 100,
                  marginLeft: "5%"
                }}
              >
                <Text
                  style={{
                    color: "floralwhite",
                    fontWeight: "bold",
                    fontSize: 20
                  }}
                >
                  {this.state.teams[this.state.currentIndex].teamname}
                </Text>
                <Text
                  style={{
                    color: "floralwhite",
                    fontWeight: "bold",
                    fontSize: 15
                  }}
                >
                  {this.state.teams[this.state.currentIndex].comment}
                </Text>
              </Animated.View>
            </Animated.View>
          );
        } else {
          // 맨 윗장을 제외한 나머지. 아직 넘기지 않은 팀의 상태
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }],
                  height: (SCREEN_HEIGHT * 3) / 4,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  paddingBottom: 20,
                  position: "absolute"
                }
              ]}
            >
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20
                }}
                source={{ uri: `${item.teamimages[0].imgUrl}` }}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    return (
      <View style={{ ...styles.backGround }}>
        <View style={{ flex: 0.9, height: "100%", flexDirection: "column" }}>
          {this.renderUsers()}
        </View>
        <View style={styles.arrow}>
          <AntDesign
            id="leftArrow"
            name="leftcircleo"
            style={styles.leftArrow}
            onPress={() => this._onChangeIndex("leftArrow")}
          />

          <Ionicons
            name="md-refresh"
            style={styles.refreshButton}
            onPress={() => this._onPresRefresh()}
          />

          <AntDesign
            id="rightArrow"
            name="rightcircleo"
            style={styles.rigthArrow}
            onPress={() => this._onChangeIndex("rightArrow")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    color: "#F9F9F8"
  },
  likeBorder: {
    transform: [{ rotate: "-30deg" }],
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 1000
  },
  dislikeBorder: {
    transform: [{ rotate: "30deg" }],
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 1000
  },
  likeText: {
    borderWidth: 3,
    borderColor: "#00ff00",
    color: "#00ff00",
    fontSize: 32,
    fontWeight: "800",
    width: 120,
    textAlign: "center",
    padding: 6
  },
  dislikeText: {
    borderWidth: 3,
    borderColor: "#ff0000",
    color: "#ff0000",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    width: 120,
    padding: 6
  },
  textshadow: {
    fontSize: 100,
    color: "#FFFFFF",
    fontFamily: "Times New Roman",
    paddingLeft: 30,
    paddingRight: 30,
    textShadowColor: "#585858",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10
  },
  arrow: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    padding: "5%"
  },
  rigthArrow: {
    height: "100%",
    fontSize: 23
  },
  leftArrow: {
    height: "100%",
    fontSize: 23
  },
  refreshButton: {
    height: "100%",
    color: "mediumturquoise",
    fontSize: 28
  },
  headerRightIcon: {
    marginRight: 15
  }
});
