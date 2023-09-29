import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { API_URL, useAuth } from "../../context/AuthContext";
import ParticipantsList from "../components/ParticipantsList";

interface RouteTwoEvent {
  isVisible: boolean;
  onClose: () => void;
  onLeave: (id: number) => void;
  eventData: {
    id: number;
    title: string;
    hostId: number;
    hostName: string;
    location: string;
    date: string;
    time: string;
    description: string;
  };
}

export const RouteTwoEventPopup: React.FC<RouteTwoEvent> = ({
  isVisible,
  onClose,
  onLeave,
  eventData,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const { userState } = useAuth();
  const [leftEvent, setLeftEvent] = useState(false); // Track if the user has left the event

  const handleLeaveEvent = async () => {
    try {
      await axios.post(`${API_URL}/eventParticipants/leave`, {
        userId: userState?.id,
        eventId: eventData.id,
      });
      setLeftEvent(true); // Set the state to indicate that the user has left the event
      onClose();
      onLeave(eventData.id);
    } catch (error) {
      console.error("Couldn't leave event:", error);
    }
  };

  // Display an alert when the user successfully leaves the event
  const showLeaveEventAlert = () => {
    Alert.alert("Success", "You have successfully left the event.", [
      {
        text: "OK",
        onPress: () => {
          setLeftEvent(false);
        },
      },
    ]);
  };

  // Render the alert message when the user leaves the event
  const renderLeaveEventAlert = () => {
    if (leftEvent) {
      return (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>
            You have successfully left the event.
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay} // Add this overlay
        activeOpacity={1} // Prevents the overlay from passing the touch event to underlying components
        onPress={onClose}
      >
        <ScrollView style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                alignSelf: "flex-end",
                marginTop: -5,
                marginEnd: -5,
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
                navigation.navigate("EventChat", eventData);
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Event Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: "10%" }}>
              <Text
                style={{
                  fontSize: 12,
                  alignSelf: "center",
                  textDecorationLine: "underline",
                }}
                onPress={() => {
                  handleLeaveEvent();
                  showLeaveEventAlert();
                }}
              >
                Leave Event
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableOpacity>
      {renderLeaveEventAlert()}
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
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: "rgba(0, 255, 0, 0.7)",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  alertText: {
    color: "green",
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black color
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RouteTwoEventPopup;
