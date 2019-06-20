import React, { Component } from "react";
import { Modal, Text, View, Alert, StyleSheet, Button } from "react-native";

export default class CancelMatchModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalStyle}>
            <View style={styles.inModalStyle}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  padding: 15
                }}
              >
                매치를 취소하고 대화방을 나가시겠습니까?
              </Text>
              <Button
                title="네"
                color="black"
                alignItems="center"
                onPress={() => this.props.cancelMatch()}
              />
              <Button
                title="아니오"
                color="black"
                alignItems="center"
                onPress={() => this.props.toggleModal()}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inModalStyle: {
    height: "25%",
    width: "80%",
    borderColor: "pink",
    borderWidth: 1.5,
    borderRadius: 20,
    borderStyle: "solid",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  }
});
