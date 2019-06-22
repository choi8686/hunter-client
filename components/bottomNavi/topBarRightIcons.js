import React from "react";
import { Icon, Badge } from "react-native-elements";
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";

export default class TopBarRightIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLetter: false,
      newChat: false
    };
  }

  toggleNewLetter = () => {
    this.setState({
      newLetter: !this.state.newLetter
    });
  };

  trueNewChat = () => {
    console.log("trueNewChat!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
    this.setState({
      newChat: true
    });
  };

  falseNewChat = () => {
    console.log("falseNewChat!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
    this.setState({
      newChat: false
    });
  };

  movetoLetterScreen = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    let userTokenArray = userToken.split("-");

    //sex, count, age, comment, teamname, locationId, storeId, userId, teamId
    const myTeamId = userTokenArray[9];
    const myTeamName = userTokenArray[5];
    this.props.navigation.navigate("LetterList", {
      myTeamId,
      myTeamName,
      trueNewLetter: this.trueNewLetter
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
              status="error"
              containerStyle={{
                position: "absolute",
                top: -4,
                right: 11
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.movetoChatList()}>
          <Icon
            type="font-awesome"
            iconStyle={styles.headerRightIcon}
            name="comment-o"
          />
          {this.state.newChat && (
            <Badge
              value="N"
              status="error"
              containerStyle={{ position: "absolute", top: -4, right: 13 }}
            />
          )}
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
