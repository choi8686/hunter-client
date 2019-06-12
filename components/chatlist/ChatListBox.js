import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

class ChatListBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { avatarURL, teamName, conversation, chatBoxIdx, moveToChatroom } = this.props;
    return (
      <ListItem
        leftAvatar={{
          source: { uri: avatarURL },
          size: "large"
        }}
        title={
          <View>
            <Text style={styles.title}>{teamName}</Text>
          </View>
        }
        subtitle={
          <View>
            <Text numberOfLines={1}>{conversation}</Text>
          </View>
        }
        chevron
        size="xlarge"
        friction={90}
        tension={100}
        style={styles.chatBoxContainer}
        onPress={() => {
          moveToChatroom(chatBoxIdx, teamName);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  chatBoxContainer: {
    borderBottomStartRadius: 20,
    borderBottomWidth: 0.3
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 10
  }
});

export default ChatListBox;
