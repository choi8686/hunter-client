import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ChatListBox from "../../components/chatlist/ChatListBox";
import { url } from "../../url";

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatList: [],
      newChat: false
    };
  }

  // changeLastComment = msgData => {
  //   const updatedChatList = Array.from(this.state.chatList);

  //   for (var partner in updatedChatList) {
  //     if (partner.uuid === msgData.uuid) {
  //       partner = { ...partner, chatMessages: msgData };
  //     }
  //   }
  //   this.setState({
  //     chatList: [...chatList, updatedChatList]
  //   });
  // };

  _moveToChatroom = (
    myTeamName,
    myTeamId,
    teamName,
    teamId,
    uuid,
    avatarURL
  ) => {
    const { trueNewChat, falseNewChat } = this.props.navigation.state.params;

    this.props.navigation.navigate("Chat", {
      myTeamName,
      myTeamId,
      teamName,
      teamId,
      uuid,
      avatarURL,
      trueNewChat,
      falseNewChat,
      trueNewChatList: this.trueNewChatList,
      falseNewChatList: this.falseNewChatList
    });
  };

  trueNewChatList = () => {
    console.log("trueNewChatList--------------------");
    this.setState({
      newChat: true
    });
  };

  falseNewChatList = () => {
    console.log("falseNewChatList--------------------");
    this.setState({
      newChat: false
    });
  };

  componentDidMount() {
    const { myTeamId } = this.props.navigation.state.params;

    const getHeaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    // teamName, idx, avatarURL, conversation

    fetch(`${url}/match/${myTeamId}`, getHeaders)
      .then(res => res.json())
      .then(data => {
        this.setState({
          chatList: data
        });
      });
  }

  render() {
    console.log(this.state.chatList, "---------------chatList---------------");
    if (this.state.chatList.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "100", color: "grey" }}>
            대화상대가 없다. 좀 더 힘내라 새끼야.
          </Text>
          <Text style={{ fontWeight: "100", color: "grey" }}>
            이러다 또 국밥먹는다
          </Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.chatListContainer}>
          {this.state.chatList.map((chatBox, idx) => {
            if (chatBox.status) {
              return (
                <ChatListBox
                  myTeamName={this.props.navigation.state.params.myTeamName}
                  teamName={chatBox.otherTeam.teamname}
                  teamId={chatBox.otherTeam.id}
                  myTeamId={chatBox.teamId}
                  conversation={chatBox.otherTeam.comment}
                  uuid={chatBox.uuid}
                  avatarURL={chatBox.otherTeam.teamimages[0].imgUrl}
                  key={idx}
                  moveToChatroom={this._moveToChatroom}
                  newChat={this.state.newChat}
                />
              );
            }
          })}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  chatListContainer: {
    flex: 1
  }
});
