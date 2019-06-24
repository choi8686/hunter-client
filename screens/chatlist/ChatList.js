import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ChatListBox from "../../components/chatlist/ChatListBox";
import NoMatchScreen from "../../components/chatlist/NoMatchScreen";
import { url } from "../../url";

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatList: [],
      newChat: false
    };
  }

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
      falseNewChat
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
    let statusCount = 0;
    this.state.chatList.forEach(chatBox => {
      if (chatBox.status) {
        statusCount++;
      }
    });
    if (statusCount === 0 || this.state.chatList.length === 0) {
      return <NoMatchScreen />;
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
