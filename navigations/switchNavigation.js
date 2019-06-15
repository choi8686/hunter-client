import RootStack from "./Navigations";
import SignOutScreen from "../screens/bottomNavi/SettingScreen";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

const SignOutStack = createStackNavigator({
  SignOut: {
    screen: SignOutScreen
  }
});

export default createAppContainer(
  createSwitchNavigator({
    RootStack,
    SignOutStack
  })
);
