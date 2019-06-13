import React, { Component } from "react";
import { StyleSheet, View, YellowBox, ScrollView, KeyboardAvoidingView } from "react-native";
import { Input, Button } from "react-native-elements";
import io from "socket.io-client";
import MessageBox from "../../components/Chat/messageBox";
import { url } from "../../url";

//웹소켓 실행시 뜨는 노란색 경고창 무시하는 코드
//기능적으로 문제 없으므로 무시하도록 함
console.ignoredYellowBox = ["Remote debugger"];
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
      //지웠던 것들
      //createdAt, img
      //teamIdx 이름 변경(userIdx --> teamId)
    };
  }

  //How to recognize 'from Me' or 'from Counterpart'
  //user idx로 구별하기
  //user idx
  //팀사진들은 객체에 저장됨. 사진 값의 0번째 인덱스.

  componentDidMount() {
    this.socket = io(`${url}`);
    this.socket.on("chat message", msgData => {
      this.setState({ chatMessages: [...this.state.chatMessages, msgData] });
    });
  }

  submitChatMessage() {
    const fullTime = new Date();
    const hour = fullTime.getHours();
    const minutes = fullTime.getMinutes();

    //FakeData
    const img = "https://i.pinimg.com/originals/5c/2d/86/5c2d8602c3e66e9ca64affaf73d6b05e.jpg";
    const teamId = 30;
    const teamName = "을지로골뱅이";

    //Server로 소켓 보내는 데이터형식
    const messageData = {
      teamId,
      teamName,
      img,
      text: this.state.chatMessage,
      createdAt: `${hour} : ${minutes}`
    };
    if (this.state.chatMessage.trim().length !== 0) {
      this.socket.emit("chat message", messageData);
    }
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map((msgData, i) => (
      <MessageBox
        key={i}
        teamId={msgData.teamId}
        text={msgData.text}
        createdAt={msgData.createdAt}
        teamName={msgData.teamName}
        img={msgData.img}
      />
    ));

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardShouldPersistTaps="always"
        enabled
        keyboardVerticalOffset={105}
      >
        {/* 채팅메시지 스크롤 뷰 */}
        <ScrollView
          style={{ flex: 0.9 }}
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {chatMessages}
        </ScrollView>
        {/* Input Box & 보내기버튼 */}
        <View style={{ flex: 0.1, marginTop: 3 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.8 }}>
              <Input
                style={{ height: 40, borderWidth: 2 }}
                autoCorrect={false}
                value={this.state.chatMessage}
                multiline={true}
                editable={true}
                // onSubmitEditing={() => this.submitChatMessage()}
                onChangeText={chatMessage => {
                  this.setState({ chatMessage });
                }}
              />
            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
              <Button title="보내기" type="solid" onPress={() => this.submitChatMessage()} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center"
  }
});
