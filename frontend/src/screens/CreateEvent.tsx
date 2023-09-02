import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackButton from "../components/BackButton";
import Icon from "react-native-vector-icons/Ionicons";

export const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleCreateEvent = () => {
    // Handle the event creation logic here
    // You can send the event details to your backend or perform any other actions.
  };

  const handleInviteFriends = () => {
    // Implement the logic to invite friends to the event
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={{ flexDirection: "row" }}>
          <BackButton color="black" />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 32,
              marginLeft: "5%",
            }}
          >
            Create New Event
          </Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="*Event Name"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="*Location"
          value={eventLocation}
          onChangeText={(text) => setEventLocation(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={eventDate}
          onChangeText={(text) => setEventDate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={eventTime}
          onChangeText={(text) => setEventTime(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={eventTime}
          onChangeText={(text) => setEventTime(text)}
        />
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={handleInviteFriends}
        >
          <Text style={styles.inviteButtonText}>Invite Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(245,245,245,1)",
    marginTop: "10%",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start", // "center"
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  createButton: {
    width: "80%",
    backgroundColor: "darkorange", // Change to your preferred button color
    borderRadius: 45,
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inviteButton: {
    width: "80%",
    backgroundColor: "orange", // Change to your preferred button color
    borderRadius: 45,
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  inviteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
