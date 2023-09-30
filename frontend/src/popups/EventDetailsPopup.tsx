import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL, useAuth } from "../../context/AuthContext";
import axios from "axios";
import ParticipantsList from "../components/ParticipantsList";

interface EventDetail {
  isVisible: boolean;
  onClose: () => void;
  eventData: {
    id: number;
    title: string;
    hostName: string;
    hostId: number;
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

  const handleOnPressJoin = async () => {
    try {
      const response = await axios.post(`${API_URL}/eventParticipants`, {
        userId: userState?.id,
        eventId: eventData.id,
      });

      // Check if the request was successful
      if (response.status === 200) {
        onClose();
      } else {
        // Handle unexpected response status codes
        console.error("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle errors with error messages from the backend
        console.error("Couldn't join event:", error.response.data.message);
      } else {
        // Handle other types of errors (e.g., network issues)
        console.error("An error occurred while joining the event:", error);
      }
    }
  };

  const handleOverlayPress = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleOverlayPress}
      >
        <ScrollView style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
              style={{
                alignSelf: "flex-end",
                marginTop: "-5%",
                marginEnd: "-5%",
              }}
            >
              <Icon name="close-circle-outline" size={30} />
            </TouchableOpacity>
            <Text style={styles.modalText}>{eventData.title}</Text>
            <Text>Host: {eventData.hostName}</Text>
            <Text>{eventData.location}</Text>
            <Text>{eventData.date}</Text>
            <Text>{eventData.time}</Text>
            <Text>{eventData.description}</Text>
            <ParticipantsList eventId={eventData.id} />

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
      </TouchableOpacity>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EventDetailScreen;
