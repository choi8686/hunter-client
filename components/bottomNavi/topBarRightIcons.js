import React from "react";
import { Icon, Badge } from "react-native-elements";
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";

export default class TopBarRightIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newChat: false
    };
  }

  trueNewChat = () => {
    this.setState({
      newChat: true
    });
  };

  falseNewChat = () => {
    this.setState({
      newChat: false
    });
  };

  movetoChatList = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    let userTokenArray = userToken.split("-");
    //sex, count, age, comment, teamname, locationId, storeId, userId, teamId
    const myTeamId = userTokenArray[9];
    const myTeamName = userTokenArray[5];

    this.props.navigation.navigate("ChatList", {
      myTeamId,
      myTeamName,
      trueNewChat: this.trueNewChat,
      falseNewChat: this.falseNewChat
    });
  };

  openBadge = () => {
    return (
      <Badge
        value="N"
        textStyle={{ color: "#FF4500", fontWeight: "bold" }}
        badgeStyle={{ borderWidth: 0, backgroundColor: "white" }}
        containerStyle={{ position: "absolute", top: -4, right: 13 }}
      />
    );
  };

  render() {
    return (
      <View style={{ flexDirection: "row", marginRight: 5 }}>
        <TouchableOpacity onPress={() => this.movetoLetterScreen()}>
          <Icon
            type="font-awesome"
            iconStyle={styles.headerRightIcon}
            name="envelope-o"
          />
          {this.state.newLetter && (
            <Badge
              value="N"
              textStyle={{ color: "#FF4500", fontWeight: "bold" }}
              badgeStyle={{ borderWidth: 0, backgroundColor: "white" }}
              containerStyle={{ position: "absolute", top: -4, right: 11 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.movetoChatList()}>
          <Icon
            type="font-awesome"
            iconStyle={styles.headerRightIcon}
            name="comment-o"
          />
          {console.log(this.state.newChat, "여기는 펄스다")}
          {this.state.newChat ? this.openBadge() : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightIcon: {
    marginRight: 20,
    color: "ghostwhite"
  }
});
