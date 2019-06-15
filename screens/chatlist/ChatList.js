import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import ChatListBox from "../../components/chatlist/ChatListBox";
import fakeListBox from "../../components/chatlist/ChatListFake";

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatList: fakeListBox
    };
  }
  _moveToChatroom = (chatBoxIdx, teamName) => {
    this.props.navigation.navigate("Chat", {
      chatBoxIdx,
      teamName
    });
  };

  render() {
    return (
      <ScrollView style={styles.chatListContainer}>
        {this.state.chatList.map(chatBox => (
          <ChatListBox
            teamName={chatBox.teamName}
            chatBoxIdx={chatBox.idx}
            avatarURL={chatBox.avatarURL}
            conversation={chatBox.conversation[chatBox.conversation.length - 1].text}
            key={chatBox.idx}
            moveToChatroom={this._moveToChatroom}
          />
        ))}
        <Button
          title="Submit"
          color="white"
          onPress={() => {
            this.props.navigation.navigate("Home", {});
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  chatListContainer: {
    flex: 1
  }
});
