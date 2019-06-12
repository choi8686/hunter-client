import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

//들어와야 하는 props목록
//1. 메시지내용(chatMessage)
//2. 보낸시간(time)
//3. 발신인인지 수신인인지 여부
//4. 발신인 팀이름
//5. 발신인 사진

const MessageBubble = ({ text, userIdx, img, createdAt }) => {
  return (
    <View style={styles.bubbleContainer}>
      <Image style={{ width: 50, height: 50 }} source={{ uri: img }} />
      <Text>{createdAt}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    flex: 1
  }
});

export default MessageBubble;
