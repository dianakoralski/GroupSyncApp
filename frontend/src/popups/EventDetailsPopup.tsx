import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
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
    hostName: string;
    hostId: number;
    location: string;
    date: string;
    time: string;
    description: string;
  };
}

interface Participant {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export const EventDetailScreen: React.FC<EventDetail> = ({
  isVisible,
  onClose,
  eventData,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [participantsData, setParticipantsData] = useState<Participant[]>([]);
  const [visibleParticipants, setVisibleParticipants] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userState } = useAuth();
  console.log("event id: ", eventData.id);
  console.log("user id: ", userState?.id);

  const handleOnPressJoin = async () => {
    try {
      const response = await axios.post(`${API_URL}/eventParticipants`, {
        userId: userState?.id,
        eventId: eventData.id,
      });

      // Check if the request was successful
      if (response.status === 200) {
        showConfirm("Event successfully joined");
        //onClose(); // Close the modal or perform other actions
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
        //console.error("Couldn't join event:", error.response.data.message);
        showAlert(error.response.data.message);
      } else {
        // Handle other types of errors (e.g., network issues)
        console.error("An error occurred while joining the event:", error);

        // Display a generic error message to the user
        showAlert("An error occurred. Please try again later."); // Set the error message in state
      }
    }
  };

  const handleOnPressParticipants = async () => {
    console.log("pressed");
    await axios
      .post(`${API_URL}/eventParticipants/seeAll`, {
        eventId: eventData.id,
      })
      .then((res) => {
        console.log("res: ", res.data);
        setParticipantsData(res.data); // Store the participant data in state
        setVisibleParticipants(!visibleParticipants);
      })
      .catch((error) => {
        console.error("couldn't display participants:", error);
      });
  };

  const showAlert = (message: string) => {
    Alert.alert(
      "Error",
      message,
      [
        {
          text: "OK",
          onPress: () => {
            onClose();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const showConfirm = (message: string) => {
    Alert.alert(
      "Success!",
      message,
      [
        {
          text: "OK",
          onPress: () => {
            onClose();
          },
        },
      ],
      { cancelable: false }
    );
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
          <Text>Host: {eventData.hostName}</Text>
          <Text>{eventData.location}</Text>
          <Text>{eventData.date}</Text>
          <Text>{eventData.time}</Text>
          <Text>{eventData.description}</Text>
          {visibleParticipants ? (
            <>
              <TouchableOpacity>
                <Text
                  style={{ color: "gray", textDecorationLine: "underline" }}
                  onPress={() => handleOnPressParticipants()}
                >
                  Hide participants
                </Text>
              </TouchableOpacity>
              <View>
                {participantsData.map((item) => (
                  <View style={styles.participantItem} key={item.userId}>
                    <Image
                      source={{ uri: item.profilePicture }}
                      style={styles.profilePicture}
                    />
                    <Text>
                      {item.firstName} {item.lastName}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <TouchableOpacity>
              <Text
                style={{ color: "gray", textDecorationLine: "underline" }}
                onPress={() => handleOnPressParticipants()}
              >
                See participants
              </Text>
            </TouchableOpacity>
          )}
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black color
    justifyContent: "center",
    alignItems: "center",
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default EventDetailScreen;
