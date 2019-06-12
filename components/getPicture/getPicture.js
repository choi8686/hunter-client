import React, { Fragment } from "react";
import { Button, Image, View, Text } from "react-native";
import { ImagePicker } from "expo";

export default class ShowPicture extends React.Component {
  state = {
    image: this.props.navigation.state.params.image
  };

  //   _pickImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true,
  //       aspect: [4, 3]
  //     });
  //     console.log(result);
  //     if (!result.cancelled) {
  //       this.setState({ image: result.uri });
  //     }
  //   };

  componentDidMount = () => {};

  render() {
    let { image } = this.state;
    

    return (
      <Fragment>
        {image !== null ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={{ uri: this.props.navigation.state.params.image }} style={{ width: 500, height: 500 }} />
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>loading</Text>
          </View>
        )}
      </Fragment>
    );
  }
}
