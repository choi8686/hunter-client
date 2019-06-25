import React from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
const CancelMatchModal = ({ teamName, toggleModal, cancelMatch }) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.modalStyle}>
          <View style={styles.inModalStyle}>
            <View style={{ flex: 0.7 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                매칭을 취소하시면{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  {teamName}
                </Text>{" "}
                님과 더 이상 매칭되실 수 없습니다.{"\n"}
                {"\n"}
                매칭을 <Text style={{ color: "#ff4500" }}>취소</Text>
                하시겠습니까?
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 25
              }}
            >
              <Button
                title="네"
                type="solid"
                buttonStyle={{ backgroundColor: "white", borderRadius: 10 }}
                titleStyle={{
                  fontSize: 18,
                  color: "#1E90FF",
                  fontWeight: "bold"
                }}
                alignItems="center"
                justifyContent="center"
                containerStyle={{ marginRight: 8, width: 65 }}
                onPress={() => cancelMatch()}
              />
              <Button
                title="아니오"
                type="solid"
                buttonStyle={{ backgroundColor: "white", borderRadius: 10 }}
                titleStyle={{
                  fontSize: 18,
                  color: "#1E90FF",
                  fontWeight: "bold"
                }}
                alignItems="center"
                justifyContent="center"
                containerStyle={{ marginLeft: 8, width: 65 }}
                onPress={() => toggleModal()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inModalStyle: {
    height: "35%",
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 5,
    width: "80%",
    borderRadius: 20,
    backgroundColor: "rgb(119,136,153)",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CancelMatchModal;
