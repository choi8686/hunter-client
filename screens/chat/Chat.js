import React, { Component } from "react";
import {
  StyleSheet,
  View,
  YellowBox,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView
} from "react-native";
import { Input, Button } from "react-native-elements";
import io from "socket.io-client";
import MessageBox from "../../components/Chat/messageBox";
import CancelMatchModal from "../../components/Chat/cancelMatchModal";
import { url } from "../../url";
import { Ionicons } from "@expo/vector-icons";

//웹소켓 실행시 뜨는 노란색 경고창 무시하는 코드
//기능적으로 문제 없으므로 무시하도록 함
console.ignoredYellowBox = ["Remote debugger"];
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default class Chat extends Component {
  constructor(props) {
    super(props);

    _isMounted = false;

    const {
      myTeamId,
      myTeamName,
      teamId,
      teamName,
      avatarURL,
      uuid
    } = this.props.navigation.state.params;

    this.state = {
      teamName,
      teamId,
      avatarURL,
      myTeamName,
      myTeamId,
      uuid,
      chatMessage: "",
      chatMessages: [],
      visibleModal: false
    };
  }
  //상단탭 옵션
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("teamName"),
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: (
        <Button
          title="매칭취소"
          type="clear"
          titleStyle={{ color: "white" }}
          style={styles.cancelMatch}
          onPress={navigation.getParam("toggleModal")}
        />
      ),
      headerLeft: (
        <Button
          icon={
            <Ionicons name="ios-arrow-round-back" size={30} color="white" />
          }
          containerStyle={{ marginLeft: 18 }}
          iconLeft
          type="clear"
          onPress={navigation.getParam("handleBackButton")}
        />
      )
    };
  };

  //BackButton 옵션(안드로이드 하단 백버튼 && 상단탭 백버튼)
  handleBackButton = async () => {
    const { falseNewChat } = this.props.navigation.state.params;
    await falseNewChat();
    await this.props.navigation.navigate("ChatList");
  };

  componentWillUnmount() {
    this._isMounted = false;
    this.toggleModal();
  }

  componentDidMount = async () => {
    this._isMounted = true;
    //안드로이드 하단 backButton 누를 시, 상단바 알람 꺼진다.
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    //ChatList로 부터 받는 navigation Props 값들
    const { trueNewChat, falseNewChat } = this.props.navigation.state.params;

    //채팅창이 열리면, 상단바에 새로운 채팅 알림이 꺼진다
    await falseNewChat();

    //채팅방 열리자마자, 상대방과의 대화목록 불러 오는 Get요청
    const loadingMsgData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    await fetch(
      `${url}/messages/getMessages/${this.state.uuid}`,
      loadingMsgData
    )
      .then(res => res.json())
      .then(msgData => {
        this.setState({ chatMessages: msgData });
      });

    //상단바 '매칭취소'버튼을 누를 시 모달(toggleModal)이 열리도록 toggleModal함수와 '매칭취소'버튼 연결해주는 로직
    const data = {
      uuid: this.state.uuid,
      myTeamName: this.state.myTeamName
    };

    this.props.navigation.setParams({ toggleModal: this.toggleModal });
    this.props.navigation.setParams({
      handleBackButton: this.handleBackButton
    });
    //-------------socket.io---------------
    //socket.io연결
    this.socket = io(`${url}`);
    //상대방과의 특정룸(uuid)에 join 하도록 emit
    this.socket.emit("joinRoom", data);
    //상대방과의 특정룸(uuid) 연결에 성공하면 console을 띄움
    this.socket.on("joinRoom", data => {
      console.log(data.myTeamName + "님이 입장하셨습니다.");
    });
    //'매칭취소'를 하게 되면 대화방에서 나가도록 하는 요청
    this.socket.on("leaveRoom", data => {
      console.log(data.myTeamName + " 님이 나가셨습니다");
    });
    //상대방에게 메시지를 보내는 로직
    this.socket.on("chat message", async msgData => {
      await trueNewChat();
      if (this._isMounted) {
        await this.setState({
          chatMessages: [...this.state.chatMessages, msgData]
        });
      }
    });
  };

  //visibleModal Toggle함수
  toggleModal = () => {
    this.setState({
      visibleModal: !this.state.visibleModal
    });
  };

  //match 취소하고 대화방 나가게 됨.
  cancelMatch = async () => {
    this.toggleModal();
    const cancelData = {
      myTeamName: this.state.myTeamName,
      uuid: this.state.uuid
    };

    const cancelMatchReq = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(`${url}/match/cancelMatch/${this.state.uuid}`, cancelMatchReq)
      .then(res => res.json())
      .then(() => this.socket.emit("leaveRoom", cancelData))
      .then(() => this.props.navigation.navigate("TabNavigator"));
  };
  //Input창 typing 처리
  handleMessage = chatMessage => {
    this.setState({
      chatMessage
    });
  };
  //메시지 상대방에게 보내는 로직
  submitChatMessage = () => {
    //Server로 소켓 보내는 데이터형식
    const messageData = {
      myTeamId: this.state.myTeamId,
      teamId: this.state.teamId,
      teamName: this.state.teamName,
      uuid: this.state.uuid,
      img: this.state.avatarURL,
      text: this.state.chatMessage
    };
    //인풋창에 빈값이 아니면 메시지를 보내도록 함
    if (this.state.chatMessage.trim().length !== 0) {
      this.socket.emit("chat message", messageData);
    }
    //그리고 인풋창은 빈값으로 반들어준다
    this.setState({ chatMessage: "" });
  };

  //새로운 대화 들어올 시 scrollView에 맵핑
  mappingChatMessages = () => {
    return this.state.chatMessages.map((msgData, i) => (
      <MessageBox
        key={i}
        myTeamIdfromServer={msgData.myTeamId}
        myTeamId={this.state.myTeamId}
        teamId={this.state.teamId}
        text={msgData.text}
        createdAt={msgData.createdAt}
        teamName={this.state.teamName}
        img={this.state.avatarURL}
      />
    ));
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={[
          styles.container,
          this.state.visibleModal ? { backgroundColor: "black" } : "white"
        ]}
        behavior="padding"
        keyboardShouldPersistTaps="always"
        enabled
        keyboardVerticalOffset={95}
      >
        {/* 채팅메시지 스크롤 뷰 */}
        <ScrollView
          style={{ flex: 0.9, marginBottom: 2 }}
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {this.mappingChatMessages()}
          {this.state.visibleModal && (
            <CancelMatchModal
              teamName={this.state.teamName}
              toggleModal={this.toggleModal}
              cancelMatch={this.cancelMatch}
            />
          )}
        </ScrollView>
        {/* Input Box & 보내기버튼 */}
        <View style={styles.InputButtonContainer}>
          <Input
            containerStyle={{ width: "85%", marginLeft: 30 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{ paddingLeft: 10 }}
            placeholder="메시지를 입력하세요"
            placeholderTextColor="#DCDCDC"
            onChangeText={this.handleMessage}
          />
          <Button
            containerStyle={{ marginRight: 40 }}
            icon={<Ionicons name="ios-send" size={40} color="#1E90FF" />}
            type="clear"
            onPress={() => this.submitChatMessage()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  cancelMatch: {
    fontWeight: "bold",
    marginRight: 5
  },
  InputButtonContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderTopWidth: 0.8,
    borderColor: "rgb(169,169,169)"
  }
});
