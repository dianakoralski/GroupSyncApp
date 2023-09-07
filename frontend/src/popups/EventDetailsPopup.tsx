import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL, useAuth } from "../../context/AuthContext";
import axios from "axios";

interface EventDetail {
  isVisible: boolean;
  onClose: () => void;
  eventData: {
    id: number;
    title: string;
    host: string;
    location: string;
    date: string;
    time: string;
    description: string;
  };
}

export const EventDetailScreen: React.FC<EventDetail> = ({
  isVisible,
  onClose,
  eventData,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const { userState } = useAuth();
  console.log("event id: ", eventData.id);
  console.log("user id: ", userState?.id);

  const handleOnPressJoin = async () => {
    await axios
      .post(`${API_URL}/eventParticipants`, {
        userId: userState?.id,
        eventId: eventData.id,
      })
      .then((res) => {
        //do something with result - say event successfully joined or something
        console.log("in then statement");
      })
      .catch((error) => {
        console.error("couldn't join event:", error);
      });
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <ScrollView style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              alignSelf: "flex-end",
              marginTop: "-5%",
              marginEnd: "-5%",
            }}
          >
            <Icon name="close-circle-outline" size={30} />
          </TouchableOpacity>

          <Text style={styles.modalText}>{eventData.title}</Text>
          <Text>Host: {eventData.host}</Text>
          <Text>{eventData.location}</Text>
          <Text>{eventData.date}</Text>
          <Text>{eventData.time}</Text>
          <Text>{eventData.description}</Text>
          <TouchableOpacity>
            <Text style={{ color: "gray", textDecorationLine: "underline" }}>
              See participants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleOnPressJoin();
            }}
          >
            <Text style={styles.buttonText}>Join Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    marginTop: "2%",
    alignSelf: "center",
    backgroundColor: "rgba(239,160,79,1)",
    padding: 10,
    borderRadius: 40,
    width: 200,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});

export default EventDetailScreen;
