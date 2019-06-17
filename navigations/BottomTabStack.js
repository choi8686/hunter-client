import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  Header
} from "react-navigation";
import { View } from "react-native";
import DistrictScreen from "../screens/bottomNavi/DistrictScreen";
import StoreScreen from "../screens/bottomNavi/StoreScreen";
import SettingScreen from "../screens/bottomNavi/SettingScreen";
import ConditionsScreen from "../components/bottomNavi/Conditions";
import ChatScreen from "../screens/chat/Chat";
import ChatListScreen from "../screens/chatlist/ChatList";

import RenewProfileScreen from "../screens/bottomNavi/RenewProfile";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "react-native-linear-gradient";

//District 스텍
const DistrictStack = createStackNavigator({
  DistrictHome: {
    screen: DistrictScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#FE7B53"
      }
    }
  }
});

//Setting 스텍
const SettingStack = createStackNavigator({
  SettingHome: {
    screen: SettingScreen,
    navigationOptions: {
      // header: props => <GradientHeader {...props} />
      headerStyle: {
        backgroundColor: "#FE7B53"
      }
    }
  },
  RenewProfile: {
    screen: RenewProfileScreen,
    navigationOptions: {
      navigationOptions: {
        // header: props => <GradientHeader {...props} />
        headerStyle: {
          backgroundColor: "#FE7B53"
        }
      },
      title: "프로필수정"
    }
  },
  Conditions: {
    screen: ConditionsScreen,
    navigationOptions: {
      navigationOptions: {
        // header: props => <GradientHeader {...props} />
        headerStyle: {
          backgroundColor: "#FE7B53"
        }
      },
      title: "이용약관"
    }
  }
});

//Store 스텍
const StoreStack = createStackNavigator({
  StoreHome: {
    screen: StoreScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#FE7B53"
      },

      title: "저기어때"
    }
  }
});

//하단탭네비게이션 - 하단 탭 각각의 버튼(disctrict, store, setting)에 담긴 screen들을 담아놓은 BottomTabNavigator다.
const TabNavigator = createBottomTabNavigator({
  DistrictTap: {
    screen: DistrictStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={24} name={"thermometer-quarter"} color={tintColor} />
      ),
      // ({ tintColor }) => <AntDesign name="run" color={tintColor} size={24} />
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "hotpink", // active icon color
        inactiveTintColor: "darkgray", // inactive icon color
        style: {
          backgroundColor: "ghostwhite" // TabBar background
        }
      }
    }
  },
  StoreTap: {
    screen: StoreStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={24} name={"thermometer-full"} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "hotpink", // active icon color
        inactiveTintColor: "darkgray", // inactive icon color
        style: {
          backgroundColor: "ghostwhite" // TabBar background
        }
      }
    }
  },
  SettingTap: {
    screen: SettingStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={24} name={"info"} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "hotpink", // active icon color
        inactiveTintColor: "darkgray", // inactive icon color
        style: {
          backgroundColor: "ghostwhite" // TabBar background
        }
      }
    }
  }
});

//HomeStack - Disctrict, Store, Setting Tab에 있는 모든 스크린들을 하나로 모은 Stack
//이 HomeStack에 담겨있는 모든 스크린들 사이에서는 Stack 인과관계가 생긴다. (즉, navigation.navigate를 통해 이동할 수 있다는 뜻이다)
const HomeStack = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    },
    ChatList: {
      screen: ChatListScreen
    },
    Chat: {
      screen: ChatScreen
    }
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={24} name={"info"} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "hotpink", // active icon color
        inactiveTintColor: "darkgray", // inactive icon color
        style: {
          backgroundColor: "ghostwhite" // TabBar background
        }
      }
    }
  },
  {
    initialRouteName: "TabNavigator"
  }
);

export default HomeStack;
