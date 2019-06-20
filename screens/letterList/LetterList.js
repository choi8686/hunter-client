import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { url } from "../../url";

export default class LetterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      letterList: []
    };
  }

  _openLetterModal = (
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

    fetch(`${url}/letter/${myTeamId}`, getHeaders)
      .then(res => res.json())
      .then(data => {
        this.setState({
          letterList: data
        });
      });
  }

  render() {
    console.log(
      this.state.letterList,
      "---------------letterList---------------"
    );
    return (
      <ScrollView style={styles.letterListContainer}>
        {this.state.letterList.map((chatBox, idx) => (
          <letterListBox
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
  letterListContainer: {
    flex: 1
  }
});
