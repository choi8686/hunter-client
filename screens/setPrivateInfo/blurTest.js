import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo";

export default class FacebookButton extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={{ padding: 15, alignItems: "center", borderRadius: 5 }}
        >
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff"
            }}
          >
            Sign in with Facebook
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

// import React from "react";
// import { View } from "react-native";
// import { LinearGradient } from "expo";

// export default class BlackFade extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <View
//           style={{ backgroundColor: "orange", flex: 1, flexDirection: "row" }}
//         />
//         <LinearGradient
//           colors={["rgba(0,0,0,0.8)", "transparent"]}
//           style={{
//             position: "absolute",
//             left: 0,
//             right: 0,
//             top: 0,
//             height: 300
//           }}
//         />
//       </View>
//     );
//   }
// }
