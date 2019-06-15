import React from "react";
import { Icon } from "react-native-elements";
import { View, StyleSheet, AsyncStorage } from "react-native";

export default class TopBarRightIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openNewsModal = () => {};

  movetoChatList = async () => {
    this.props.navigation.navigate("ChatList");
  };

  render() {
    return (
      <View style={{ flexDirection: "row", marginRight: 10 }}>
        <Icon
          type="font-awesome"
          iconStyle={styles.headerRightIcon}
          name="envelope"
          onPress={() => alert("This is a button!")}
        />
        <Icon
          type="font-awesome"
          iconStyle={styles.headerRightIcon}
          name="comment"
          onPress={() => this.movetoChatList()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightIcon: {
    marginRight: 20,
    color: "red"
  }
});
