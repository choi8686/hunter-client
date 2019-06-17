import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ChatListBox from "../../components/chatlist/ChatListBox";
import fakeListBox from "../../components/chatlist/ChatListFake";
import { url } from "../../url";

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

  componentDidMount() {
    const { teamId, teamName, userId } = this.props.navigation.state.params;

    const getHeaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    // teamName, idx, avatarURL, conversation
    // let idx = null;
    // let teamName = null;
    // let avatarURL = "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    // data.map()

    fetch(`${url}/messages/${teamId}`, getHeaders)
      .then(res => res.json())
      .then(data => console.log(data, 1111111111111111111111));
  }

  render() {
    return (
      <ScrollView style={styles.chatListContainer}>
        {this.state.chatList.map(chatBox => (
          <ChatListBox
            teamName={chatBox.teamName}
            chatBoxIdx={chatBox.idx}
            avatarURL={chatBox.avatarURL}
            conversation={
              chatBox.conversation[chatBox.conversation.length - 1].text
            }
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
