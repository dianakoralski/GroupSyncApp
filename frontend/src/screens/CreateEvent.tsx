import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import BackButton from "../components/BackButton";
import axios from "axios";
import { API_URL } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";

export const CreateEvent = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false); // Track event visibility

  const handleCreateEvent = async () => {
    // Handle the event creation logic here
    // You can send the event details and isPublic to your backend or perform any other actions.
    const host = "Self";
    await axios.post(`${API_URL}/posts`, {
      title,
      location,
      date,
      time,
      description,
      isPublic,
      host,
    });
    navigation.navigate("Home");
  };

  const handleInviteFriends = () => {
    // Implement the logic to invite friends to the event
  };

  return (
    <ScrollView>
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
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="*Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={date}
            onChangeText={(text) => setDate(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={time}
            onChangeText={(text) => setTime(text)}
          />
          <TextInput
            style={{
              width: "80%",
              backgroundColor: "rgba(236,236,236,1)",
              borderRadius: 10,
              borderWidth: 1,
              marginBottom: 20,
              padding: 10,
            }}
            multiline
            numberOfLines={4}
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Text style={{ width: "70%", textAlign: "center" }}>
            Do you want your event to be public or private to all your friends?
          </Text>
          <View style={styles.switchContainer}>
            <Text style={{ marginRight: 10 }}>Public</Text>
            <Switch
              value={isPublic}
              onValueChange={(value) => setIsPublic(value)}
            />
            <Text style={{ marginLeft: 10 }}>Private</Text>
          </View>
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
    </ScrollView>
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
    justifyContent: "flex-start",
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
    backgroundColor: "darkorange",
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
    backgroundColor: "orange",
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
