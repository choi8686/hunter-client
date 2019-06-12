import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RightMessageBubble from "./rightMessageBubble";
import LeftMessageBubble from "./leftMessageBubble";
import { Avatar } from "react-native-elements";

//들어와야 하는 props목록
//1. 메시지내용(chatMessage)
//2. 보낸시간(time)
//3. 발신인인지 수신인인지 여부
//4. 발신인 팀이름
//5. 발신인 사진

const MessageBox = ({ text, teamId, teamName, createdAt, img }) => {
  if (teamId === 30) {
    return <RightMessageBubble teamId={teamId} text={text} />;
  } else {
    <View style={styles.messageBox}>
      <View style={styles.teamName}>
        <Text>{teamName}</Text>
      </View>
      <View style={styles.AvatarBubbleContainer}>
        <View style={styles.avatar}>
          <Avatar
            size="small"
            rounded
            source={{
              uri: img
            }}
          />
        </View>
        <LeftMessageBubble style={styles.bubble} teamId={teamId} text={text} />
      </View>
    </View>;
  }
};

const styles = StyleSheet.create({
  messageBox: {
    flex: 1
  },
  teamName: {
    flex: 0.2
  },
  AvatarBubbleContainer: {
    flex: 0.8,
    flexDirection: "row"
  },
  avatar: {
    flex: 0.3
  },
  bubble: {
    flex: 0.7
  }
});

export default MessageBox;
