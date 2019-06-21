import { createStackNavigator } from "react-navigation";

import ChooseDistrictScreen from "../screens/setPrivateInfo/setDistrict";
import ChooseStoreScreen from "../screens/setPrivateInfo/setStore";
import ChooseSexScreen from "../screens/setPrivateInfo/setSex";
import SetTeamInfoScreen1 from "../screens/setPrivateInfo/setTeamInfo1";
import SetTeamInfoScreen2 from "../screens/setPrivateInfo/setTeamInfo2";

import SetTeamPictureScreen from "../screens/setPrivateInfo/setTeamPicture";
import GetPictureScreen from "../components/getPicture/getPicture";

//팀생성 스택 - ChooseSex부터 SetTeamPicture 까지 담겨있는 스택
const createTeamStack = createStackNavigator(
  {
    ChooseSex: {
      screen: ChooseSexScreen,
      navigationOptions: {
        header: null
      }
    },
    SetTeamInfo1: {
      screen: SetTeamInfoScreen1,
      navigationOptions: {
        header: null
      }
    },
    SetTeamInfo2: {
      screen: SetTeamInfoScreen2,
      navigationOptions: {
        header: null
      }
    },
    SetTeamPicture: {
      screen: SetTeamPictureScreen,
      navigationOptions: {
        header: null
      }
    },
    GetPicture: {
      screen: GetPictureScreen
    },
    ChooseDistrict: {
      screen: ChooseDistrictScreen,
      navigationOptions: {
        header: null
      }
    },
    ChooseStore: {
      screen: ChooseStoreScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "ChooseSex"

    // 김종욱이 테스트중
    // initialRouteName: "SetTeamPicture"
  }
);

export default createTeamStack;
