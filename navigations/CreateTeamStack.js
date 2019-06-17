import { createStackNavigator } from "react-navigation";

import ChooseDistrictScreen from "../screens/setPrivateInfo/setDistrict";
import ChooseStoreScreen from "../screens/setPrivateInfo/setStore";
import ChooseSexScreen from "../screens/setPrivateInfo/setSex";
import SetTeamInfoScreen1 from "../screens/setPrivateInfo/setTeamInfo1";
import SetTeamInfoScreen2 from "../screens/setPrivateInfo/setTeamInfo2";

import SetTeamPictureScreen1 from "../screens/setPrivateInfo/setTeamPicture1";
import SetTeamPictureScreen2 from "../screens/setPrivateInfo/setTeamPicture2";
import SetTeamPictureScreen3 from "../screens/setPrivateInfo/setTeamPicture3";
import GetPictureScreen from "../components/getPicture/getPicture";

//팀생성 스택 - ChooseSex부터 SetTeamPicture3까지 담겨있는 스택
const createTeamStack = createStackNavigator(
  {
<<<<<<< HEAD:navigations/Navigations.js
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    },
    SetTeamPicture1: {
      screen: SetTeamPictureScreen1,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: MainScreen,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        header: null
      }
    },
=======
>>>>>>> 2859dd0b9f7a6accb65fc922ef8d6a3ad1af6b80:navigations/CreateTeamStack.js
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
    SetTeamPicture1: {
      screen: SetTeamPictureScreen1,
      navigationOptions: {
        header: null
      }
    },
    SetTeamPicture2: {
      screen: SetTeamPictureScreen2,
      navigationOptions: {
        header: null
      }
    },
    SetTeamPicture3: {
      screen: SetTeamPictureScreen3,
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
  }
);

export default createTeamStack;
