import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import DistrictScreen from "../screens/bottomNavi/DistrictScreen";
import StoreScreen from "../screens/bottomNavi/StoreScreen";
import SettingScreen from "../screens/bottomNavi/SettingScreen";
import ConditionsScreen from "../components/bottomNavi/Conditions";
import RenewProfileScreen from "../components/bottomNavi/RenewProfile";

import { Icon } from "react-native-elements";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

//District 스텍
const DistrictStack = createStackNavigator({
  DistrictHome: {
    screen: DistrictScreen
  }
});

//Setting 스텍
const SettingStack = createStackNavigator({
  SettingHome: {
    screen: SettingScreen
  },
  RenewProfile: {
    screen: RenewProfileScreen,
    navigationOptions: {
      title: "프로필수정"
    }
  },
  Conditions: {
    screen: ConditionsScreen,
    navigationOptions: {
      title: "이용약관"
    }
  }
});

//Store 스텍
const StoreStack = createStackNavigator({
  StoreHome: {
    screen: StoreScreen,
    navigationOptions: {
      title: "저기어때"
    }
  }
});

//하단탭네비게이션
const TabNavigator = createBottomTabNavigator({
  DistrictTap: {
    screen: DistrictStack
  },
  StoreTap: {
    screen: StoreStack
  },
  SettingTap: {
    screen: SettingStack
  }
});

DistrictStack.navigationOptions = {
  // tabBarLabel: "라운지",
  tabBarIcon: ({ tintColor }) => <FontAwesome size={24} name={"thermometer-quarter"} color={tintColor} />,
  // ({ tintColor }) => <AntDesign name="run" color={tintColor} size={24} />
  tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: "#F8F8F8", // active icon color
    inactiveTintColor: "#586589", // inactive icon color
    style: {
      backgroundColor: "black" // TabBar background
    }
  }
};

// #171F33
StoreStack.navigationOptions = {
  // tabBarLabel: "매장",
  tabBarIcon: ({ tintColor }) => <FontAwesome size={24} name={"thermometer-full"} color={tintColor} />,
  tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: "#F8F8F8", // active icon color
    inactiveTintColor: "#586589", // inactive icon color
    style: {
      backgroundColor: "black" // TabBar background
    }
  }
};

SettingStack.navigationOptions = {
  // tabBarLabel: "설정",
  tabBarIcon: ({ tintColor }) => <FontAwesome size={24} name={"info"} color={tintColor} />,
  tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: "#F8F8F8", // active icon color
    inactiveTintColor: "#586589", // inactive icon color
    style: {
      backgroundColor: "black" // TabBar background
    }
  }
};

const AppTabContainer = createAppContainer(TabNavigator);

class TabMainNavigator extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    console.log(this.props.navigation.state.params, " params => TapNavigations.js line:144");
    return <AppTabContainer />; // AppTabContainet 컴포넌트를 리턴한다.
  }
}

const HomeStack = createStackNavigator({ TabMainNavigator });

export default HomeStack;
