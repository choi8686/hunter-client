import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const RightMessageBubble = ({ text, teamId }) => {
  return (
    <View style={[styles.item, styles.itemOut]}>
      <View style={[styles.balloon, { backgroundColor: "#1084ff" }]}>
        <Text style={{ paddingTop: 5, color: "white", fontSize: 16 }}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: "row"
  },
  itemOut: {
    alignSelf: "flex-end",
    marginRight: 20
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 10
  }
});

export default RightMessageBubble;
