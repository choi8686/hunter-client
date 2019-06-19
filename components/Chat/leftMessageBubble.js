import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const LeftMessageBubble = ({ text }) => {
  return (
    <View style={[styles.item, styles.itemIn]}>
      <View style={[styles.balloon, { backgroundColor: "grey" }]}>
        <Text style={{ paddingTop: 5, color: "white", fontSize: 16 }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: "row"
  },
  itemIn: {
    alignSelf: "flex-start",
    marginLeft: 0
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 10
  }
});

export default LeftMessageBubble;
