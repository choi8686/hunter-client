import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
  PublisherBanner
} from "expo";

export default class AdsMob extends React.Component {
  componentDidMount() {
    AdMobInterstitial.setTestDeviceID("EMULATOR");
    // ALWAYS USE TEST ID for Admob ads
    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");

    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      console.log("interstitialDidLoad")
    );

    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      console.log("interstitialDidFailToLoad")
    );

    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("interstitialDidOpen")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () =>
      console.log("interstitialDidClose")
    );
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      console.log("interstitialWillLeaveApplication")
    );
  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  bannerError() {
    console.log("An error");
    return;
  }

  showInterstitial() {
    AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
          title="Interstitial"
          onPress={this.showInterstitial}
          containerViewStyle={styles.interstitialBanner}
        />
        <PublisherBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
          onAdMobDispatchAppEvent={this.adMobEvent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  interstitialBanner: {
    width: "100%",
    marginLeft: 0
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
// /////// Alert창 활용법!!!!!

// import React, { Component } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Image
// } from "react-native";

// import { Constants } from "expo";

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.button} onPress={this._showAlert}>
//           <Text style={{ fontSize: 32, color: "white" }}>Show Alert!</Text>
//         </TouchableOpacity>
//         <View>
//           <Image
//             source={{
//               uri:
//                 "file:///Users/iaan/Library/Developer/CoreSimulator/Devices/2DF7D6C3-CA95-4E28-9A58-635E8F62E803/data/Containers/Data/Application/CE6875D5-E076-4947-84B8-B02B6E71E982/Library/Caches/ExponentExperienceData/%2540anonymous%252Fclient-e929a6b2-5ca2-4b09-90c2-393d157386ba/ImagePicker/088A3AA7-3B29-4742-842C-1BAFE793E880.jpg"
//             }}
//             style={{ width: 150, height: 150 }}
//           />
//         </View>
//       </View>
//     );
//   }

//   // TODO: maybe do something besides a console.log when
//   // each of the options is pressed, and make the alert actually
//   // interesting by doing something funny or whatever
//   _showAlert = () => {
//     Alert.alert(
//       "진심 삭제 ? 레알 ? ",
//       "My Alert Msg",
//       [
//         {
//           text: "Ask me later",
//           onPress: () => console.log("Ask me later pressed")
//         },
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         }
//         // { text: "OK", onPress: () => console.log("OK Pressed") }
//       ],
//       { cancelable: false }
//     );
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: "#ecf0f1"
//   },
//   button: {
//     margin: 24,
//     padding: 40,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: "transparent",
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#34495e",
//     backgroundColor: "#ff6666"
//   }
// });

// import React, { Component } from "react";
// import {
//   TextInput,
//   Image,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Platform
// } from "react-native";

// export default class App extends Component {
//   constructor() {
//     super();

//     this.state = { hidePassword: true };
//   }

//   managePasswordVisibility = () => {
//     this.setState({ hidePassword: !this.state.hidePassword });

//     // function used to change password visibility
//   };

//   render() {
//     return (
//       <View style={styles.passwordContainer}>
//         <View style={styles.textBoxBtnHolder}>
//           <TextInput
//             underlineColorAndroid="transparent"
//             secureTextEntry={this.state.hidePassword}
//             style={styles.textBox}
//           />
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.visibilityBtn}
//             onPress={this.managePasswordVisibility}
//           >
//             <Image
//               source={
//                 this.state.hidePassword
//                   ? require("../../assets/hide.png")
//                   : require("../../assets/view.png")
//               }
//               style={styles.btnImage}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   passwordContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 25,
//     paddingTop: Platform.OS === "ios" ? 20 : 0
//   },

//   textBoxBtnHolder: {
//     position: "relative",
//     alignSelf: "stretch",
//     justifyContent: "center"
//   },

//   textBox: {
//     fontSize: 18,
//     alignSelf: "stretch",
//     height: 45,
//     paddingRight: 45,
//     paddingLeft: 8,
//     borderWidth: 1,
//     paddingVertical: 0,
//     borderColor: "grey",
//     borderRadius: 5
//   },

//   visibilityBtn: {
//     position: "absolute",
//     right: 3,
//     height: 40,
//     width: 35,
//     padding: 5
//   },

//   btnImage: {
//     resizeMode: "contain",
//     height: "100%",
//     width: "100%"
//   }
// });
