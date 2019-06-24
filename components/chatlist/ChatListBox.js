import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ListItem, Badge } from "react-native-elements";

const ChatListBox = ({
  myTeamName,
  myTeamId,
  avatarURL,
  teamName,
  teamId,
  conversation,
  uuid,
  moveToChatroom,
  newChat
}) => {
  return (
    <View>
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
          moveToChatroom(
            myTeamName,
            myTeamId,
            teamName,
            teamId,
            uuid,
            avatarURL
          );
        }}
      />
      {newChat && (
        <Badge
          value="N"
          textStyle={{ fontWeight: "bold" }}
          badgeStyle={{ borderWidth: 0, backgroundColor: "#FF4500" }}
          containerStyle={{
            position: "absolute",
            top: 14,
            right: 22
          }}
        />
      )}
    </View>
  );
};

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
