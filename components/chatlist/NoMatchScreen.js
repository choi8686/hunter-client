import React from "react";
import { View, Text } from "react-native";

const NoMatchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "100", color: "grey" }}>
        대화상대가 없습니다.
      </Text>
    </View>
  );
};

export default NoMatchScreen;
