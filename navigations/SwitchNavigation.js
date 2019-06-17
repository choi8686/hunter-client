import createTeamStack from "./CreateTeamStack";
import HomeStack from "./BottomTabStack";
import MainScreen from "../screens/main/Main";
import SignInScreen from "../screens/signin/SignIn";
import SignUpScreen from "../screens/signup/SignUp";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

//최상위 네비게이터 - Main/SignIn/SignUp/CreateTeamStack/HomeStack 이 담겨있다.
//각각의 화면들 사이에 이동은 할 수 있지만, SwitchNavigator이기 때문에 뒤로가기는 할 수 없다.
const AppNavigator = createSwitchNavigator(
  {
    Main: MainScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    createTeam: createTeamStack,
    Home: HomeStack
  },
  {
    initialRouteName: "Main"
  }
);

export default createAppContainer(AppNavigator);
