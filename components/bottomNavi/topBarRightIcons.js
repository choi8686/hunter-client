import React from "react";
import { Icon } from "react-native-elements";
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";

export default class TopBarRightIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  movetoLetterScreen = async () => {
    alert("쪽지스크린이와야함");
    // let userToken = await AsyncStorage.getItem("userToken");
    // let userTokenArray = userToken.split("-");

    // //sex, count, age, comment, teamname, locationId, userId, id
    // const teamId = userTokenArray[7];
    // const userId = userTokenArray[6];
    // const teamName = userTokenArray[4];

    // this.props.navigation.navigate("Letter", { teamId, userId, teamName });
  };
  movetoChatList = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    let userTokenArray = userToken.split("-");
    console.log(userTokenArray, "22223232323232323");
    //sex, count, age, comment, teamname, locationId, storeId, userId, teamId
    const myTeamId = userTokenArray[9];
    const myTeamName = userTokenArray[5];

    this.props.navigation.navigate("ChatList", { myTeamId, myTeamName });
  };

  render() {
    return (
      <View style={{ flexDirection: "row", marginRight: 5 }}>
        <TouchableOpacity onPress={() => this.movetoLetterScreen()}>
          <Icon
            type="font-awesome"
            iconStyle={styles.headerRightIcon}
            name="envelope"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.movetoChatList()}>
          <Icon
            type="font-awesome"
            iconStyle={styles.headerRightIcon}
            name="comment-o"
          />
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
