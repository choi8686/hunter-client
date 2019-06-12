import React, { Fragment, Component } from "react";
import { LinearGradient, ImagePicker } from "expo";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
    );
  }
}
const NextButton = props => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={props.nextNavi}>
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  );
};

const Dot = props => {
  let currentStyle = props.active ? styles.dotActive : styles.dotInactive;

  return (
    <TouchableOpacity onPress={props.next}>
      <View style={[styles.dot, currentStyle]} />
    </TouchableOpacity>
  );
};

export default class TeamPicture3 extends Component {
  state = ({
    image: this.props.navigation.state.params.image,
    sex: this.props.navigation.state.params.sex,
    teamname: this.props.navigation.state.params.teamname,
    count: this.props.navigation.state.params.count,
    averageAge: this.props.navigation.state.params.averageAge,
    comment: this.props.navigation.state.params.comment,
    userId: this.props.navigation.state.params.userId
  });

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (result.cancelled) {
      return;
    }
    let image = this.state.image;
    image[2] = result.uri;
    this.setState({ image: image });
  };

  componentDidMount = () => {};
  render() {
    //사진 정보가 모두 들어있는 image => 이 이미지 파일들을 s3에 저장한다.
    const { sex, teamname, count, averageAge, comment, image, userId } = this.state;
    thirdImage = image[2];
    return (
      <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
        <View style={styles.container}>
          <View style={styles.dotContainer}>
            <Dot
              next={() => {
                this.props.navigation.navigate("SetTeamPicture1", {
                  sex,
                  teamname,
                  count,
                  averageAge,
                  comment,
                  image,
                  userId
                });
              }}
            />
            <Dot
              next={() => {
                this.props.navigation.navigate("SetTeamPicture2", {
                  sex,
                  teamname,
                  count,
                  averageAge,
                  comment,
                  image,
                  userId
                });
              }}
            />
            <Dot active={true} />
          </View>
          <View style={styles.titleContainer}>
            <Title name="첫 번째 팀 사진을 저장해주세요" />
            <Title name="(사진 누르면 수정가능)" />
          </View>
          {thirdImage === null ? (
            <TouchableOpacity onPress={this._pickImage} lineHeight="300">
              {/* <Text style={styles.text}>[ + ]</Text> */}
              <Icon name="image" color="#00aced" size={200} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this._pickImage}>
              <Image source={{ uri: thirdImage }} style={{ width: 320, height: 240, resizeMode: 'contain'  }} />
            </TouchableOpacity>
          )}
          <NextButton
            nextNavi={() => {
              
                this.props.navigation.navigate("ChooseDistrict", {
                    sex,
                    teamname,
                    count,
                    averageAge,
                    comment,
                    image,
                    userId
                  })
                
            }}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  dotActive: {
    backgroundColor: "#FC3768"
  },
  dotInactive: {
    backgroundColor: "#D2D2D4"
  },
  dotContainer: {
    width: 80,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginTop: "0%",
    width: "100%",
    color: "white",
    fontSize: 15
  },
  text: {
    textAlign: "center",
    paddingLeft: 60,
    paddingRight: 60,
    fontSize: 50,
    lineHeight: 300
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#FC3768",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  nextButtonText: {
    fontSize: 20,
    color: "white"
  },
  content: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});
