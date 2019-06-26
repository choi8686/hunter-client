import React, { Component } from "react";
import { LinearGradient, ImagePicker, Permissions } from "expo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import { url } from "../../url";

import * as ImageManipulator from "expo-image-manipulator";

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
    <TouchableOpacity
      style={styles.nextButton}
      onPress={props.handleImagePicked}
    >
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  );
};

// const Dot = props => {
//   let currentStyle = props.active ? styles.dotActive : styles.dotInactive;

//   return (
//     <TouchableOpacity onPress={props.next}>
//       <View style={[styles.dot, currentStyle]} />
//     </TouchableOpacity>
//   );
// };

export default class TeamPicture extends Component {
  state = {
    image: {
      0: "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/no_img.jpg",
      1: "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/no_img.jpg",
      2: "https://hunter-bucker.s3.ap-northeast-2.amazonaws.com/assets/no_img.jpg"
    },
    sex: this.props.navigation.state.params.data.sex,
    teamname: this.props.navigation.state.params.data.teamname,
    count: this.props.navigation.state.params.data.count,
    averageAge: this.props.navigation.state.params.data.age,
    comment: this.props.navigation.state.params.data.comment,
    userId: this.props.navigation.state.params.data.userId,
    districtId: this.props.navigation.state.params.data.districtId,
    storeId: this.props.navigation.state.params.data.storeId,
    teamId: this.props.navigation.state.params.data.teamId
  };

  _uploadImageAsync = async (uri, num) => {
    let apiUrl = `${url}/upload`;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `${this.state.teamId}-${num}.${fileType}`,
      type: `image/${fileType}`
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        teamId: this.props.navigation.state.params.data.teamId
      }
    };
    return await fetch(apiUrl, options).then(res =>
      console.log(res, "사진 res다 이놈아 !!!")
    );
  };

  _pickImage = async num => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [5, 7]
      });

      // console.log(pickerResult.cancelled, "pickerResult.cancelled");
      // if (!pickerResult.cancelled) {
      //   let image = this.state.image;
      //   image[num] = pickerResult.uri;
      //   await this.setState({ image: image });
      // }

      console.log(pickerResult, "pickerResult!!!!");
      if (!pickerResult.cancelled) {
        IMAGE_URI = pickerResult.uri;
        console.log(IMAGE_URI, "IMAGE_URI");

        //그 어떤 파일도 JPG로 바꾸어줌
        const pictureConverted = await ImageManipulator.manipulateAsync(
          IMAGE_URI,
          [{ rotate: 0 }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPG }
        );

        console.log(pictureConverted, "pictureConverted");
        let image = this.state.image;
        image[num] = pictureConverted.uri;

        await this.setState({ image: image });
      }
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      // if (!pickerResult.cancelled) {
      await this._uploadImageAsync(this.state.image[0], 1);
      await this._uploadImageAsync(this.state.image[1], 2);
      await this._uploadImageAsync(this.state.image[2], 3);
      // }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
    } finally {
      this.props.navigation.navigate("Home");
      console.log("upload!");
    }
  };

  render() {
    const { image } = this.state;
    const firstImage = image[0];
    const secondImage = image[1];
    const thirdImage = image[2];

    return (
      <LinearGradient
        colors={["coral", "#f44283", "#f441bb", "#8341f4"]}
        style={styles.backGround}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title name="팀 사진을 저장해주세요" />
            {/* 아래 줄은 화면조율을 위해 필요한 부분 */}
            <Title name=" " />
          </View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={{ fontSize: 16, color: "black" }}>
                대표 사진을 올려주세요
              </Text>
            </View>
            {firstImage === null ? (
              <TouchableOpacity
                onPress={() => this._pickImage(0)}
                lineHeight="300"
              >
                <Icon name="image" color="#00aced" size={300} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this._pickImage(0)}>
                <Image
                  source={{ uri: firstImage }}
                  style={{
                    width: 250,
                    height: 350,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            )}

            <View>
              <Text style={{ fontSize: 16, color: "black" }}>
                매력포인트 사진을 올려주세요
              </Text>
            </View>
            {secondImage === null ? (
              <TouchableOpacity
                onPress={() => this._pickImage(1)}
                lineHeight="300"
              >
                <Icon name="image" color="#00aced" size={300} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this._pickImage(1)}>
                <Image
                  source={{ uri: secondImage }}
                  style={{
                    width: 250,
                    height: 350,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            )}

            <View>
              <Text style={{ fontSize: 16, color: "black" }}>
                우리 팀을 잘 표현한 사진을 올려주세요
              </Text>
            </View>
            {thirdImage === null ? (
              <TouchableOpacity
                onPress={() => this._pickImage(2)}
                lineHeight="300"
              >
                <Icon name="image" color="#00aced" size={300} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this._pickImage(2)}>
                <Image
                  source={{ uri: thirdImage }}
                  style={{
                    width: 250,
                    height: 350,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            )}
          </ScrollView>
          <NextButton handleImagePicked={this._handleImagePicked} />
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
    paddingTop: "5%",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginTop: "5%",
    width: "100%",
    color: "white",
    fontWeight: "bold",
    fontSize: 20
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
