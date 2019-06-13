import React from "react";
import { Image, StyleSheet, View, StatusBar,Text } from "react-native";
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'




export default class BlurViewExample extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
  <Avatar
    rounded
    source={{
      uri: 'https://randomuser.me/api/portraits/men/41.jpg',
    }}
    size="large"
  />
<Icon type="ionicon" name="md-cart" />
  <Badge status="warning" />
{/* <Badge value={<Text>My Custom Badge</Text>}/> */}


    </View>

      </View>
    );
  }
}

{/* <Badge
    status="success"
    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
  /> */}

  {/* <Badge status="success" /> */}
{/* <Badge status="error" /> */}
{/* <Badge status="primary" /> */}

{/* <Badge value="99+" status="error" /> */}