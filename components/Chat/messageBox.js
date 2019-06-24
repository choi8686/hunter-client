import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RightMessageBubble from "./rightMessageBubble";
import LeftMessageBubble from "./leftMessageBubble";
import { Avatar } from "react-native-elements";

const MessageBox = ({ myTeamIdfromServer, myTeamId, text, teamName, img }) => {
  if (myTeamId == myTeamIdfromServer) {
    return <RightMessageBubble text={text} />;
  } else {
    return (
      <View style={styles.messageBox}>
        <View style={styles.avatar}>
          <Avatar
            size="medium"
            rounded
            source={{
              uri: img
            }}
          />
        </View>
        <View style={styles.nameAndBubble}>
          <View style={styles.name}>
            <Text>{teamName}</Text>
          </View>
          <View style={styles.bubble}>
            <LeftMessageBubble text={text} />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  messageBox: {
    flex: 1,
    flexDirection: "row"
  },
  avatar: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5
  },
  nameAndBubble: {
    flex: 0.8
  },
  name: {
    flex: 0.2
  },
  bubble: {
    flex: 0.8
  }
});

export default MessageBox;
