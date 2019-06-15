import React, { Fragment, Component } from "react";
import { LinearGradient, ImagePicker, Permissions } from "expo";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { url } from "../../url";

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
    <TouchableOpacity style={styles.nextButton} onPress={props.handleImagePicked}>
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

export default class TeamPicture2 extends Component {
  state = {
    image: this.props.navigation.state.params.image,
    sex: this.props.navigation.state.params.sex,
    teamname: this.props.navigation.state.params.teamname,
    count: this.props.navigation.state.params.count,
    averageAge: this.props.navigation.state.params.averageAge,
    comment: this.props.navigation.state.params.comment,
    userId: this.props.navigation.state.params.userId,
    locationId: this.props.navigation.state.params.locationId
  };

  _uploadImageAsync = async uri => {
    let apiUrl = `${url}/upload`;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        userId: this.props.navigation.state.params.userId
      }
    };
    console.log("fetch=================>", apiUrl, options);
    return await fetch(apiUrl, options);
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      let image = this.state.image;
      image[1] = pickerResult.uri;
      this.setState({ image: image });
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    console.log("URL===========>", this.state.image[1]);
    try {
      if (!pickerResult.cancelled) {
        uploadResponse = await this._uploadImageAsync(this.state.image[1]);
        uploadResult = await uploadResponse.json();
      }
      console.log(uploadResult);
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert(" 또안되네시발 ");
    } finally {
      const { sex, teamname, count, averageAge, comment, image, userId, locationId } = this.state;
      this.props.navigation.navigate("SetTeamPicture3", {
        sex,
        teamname,
        count,
        averageAge,
        comment,
        image,
        userId,
        locationId
      });
      console.log("upload!");
    }
  };

  componentDidMount = () => {};
  render() {
    console.log(this.props.navigation.state.params, "props... setTeamPicture2.js 107lines");
    const { sex, teamname, count, averageAge, comment, image, userId, locationId } = this.state;
    secondImage = image[1];
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
                  userId,
                  locationId
                });
              }}
            />
            <Dot active={true} />
            <Dot
              next={() => {
                this.props.navigation.navigate("SetTeamPicture3", {
                  sex,
                  teamname,
                  count,
                  averageAge,
                  comment,
                  image,
                  userId,
                  locationId
                });
              }}
            />
          </View>
          <View style={styles.titleContainer}>
            <Title name="첫 번째 팀 사진을 저장해주세요" />
            <Title name="(사진 누르면 수정가능)" />
          </View>
          {secondImage === null ? (
            <TouchableOpacity onPress={this._pickImage} lineHeight="300">
              <Icon name="image" color="#00aced" size={200} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this._pickImage}>
              <Image source={{ uri: secondImage }} style={{ width: 320, height: 320 }} />
            </TouchableOpacity>
          )}
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
