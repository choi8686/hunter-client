import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
// import ChatListBox from "../../components/chatlist/ChatListBox";
// import fakeListBox from "../../components/chatlist/ChatListFake";
import { url } from "../../url";

export default class Letter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      letterList = {}
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
    let avatarURL =
      "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80";

    const getHeaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    // teamName, idx, avatarURL, conversation

    fetch(`${url}/messages/${teamId}`, getHeaders)
      .then(res => res.json())
      .then(data => {
        this.setState({
          chatList: data
        });
      })
      .then(re => console.log(this.state.chatList, 99999999999999999999999999));
  }

  render() {
    return (
      <ScrollView style={styles.chatListContainer}>
        {this.state.chatList.map((chatBox, idx) => (
          <ChatListBox
            teamName={chatBox.otherTeam.teamname}
            chatBoxIdx={chatBox.otherTeam.id}
            avatarURL={
              "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
            }
            conversation={chatBox.otherTeam.comment}
            key={idx}
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
