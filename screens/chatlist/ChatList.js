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
      chatList: []
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
    this.props.navigation.navigate("Chat", {
      myTeamName,
      myTeamId,
      teamName,
      teamId,
      uuid,
      avatarURL
    });
  };

  componentDidMount() {
    const { myTeamId, myTeamName } = this.props.navigation.state.params;

    const getHeaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    // teamName, idx, avatarURL, conversation

    fetch(`${url}/messages/${myTeamId}`, getHeaders)
      .then(res => res.json())
      .then(data => {
        this.setState({
          chatList: data
        });
      });
  }

  render() {
    console.log(this.state.chatList, "---------------chatList---------------");
    return (
      <ScrollView style={styles.chatListContainer}>
        {this.state.chatList.map((chatBox, idx) => (
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
