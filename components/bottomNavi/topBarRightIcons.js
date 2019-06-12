import React from "react";
import { Icon } from "react-native-elements";
import { View, StyleSheet } from "react-native";

export default class TopBarRightIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flexDirection: "row", marginRight: 10 }}>
        <Icon
          type="font-awesome"
          iconStyle={styles.headerRightIcon}
          name="bell"
          onPress={() => alert("This is a button!")}
        />
        <Icon
          type="font-awesome"
          iconStyle={styles.headerRightIcon}
          name="comments"
          onPress={() => alert("This is a button!")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightIcon: {
    marginRight: 15
  }
});
