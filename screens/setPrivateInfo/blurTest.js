import React from "react";
import { Image, StyleSheet, View, StatusBar } from "react-native";
import { BlurView } from "expo";

const uri = "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png";

export default class BlurViewExample extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ width: 192, height: 192 }} source={{ uri }} />

        {/* Adjust the tint and intensity */}
        <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
          <Image style={{ width: 96, height: 96 }} source={{ uri }} />
        </BlurView>

        <StatusBar hidden />
      </View>
    );
  }
}
