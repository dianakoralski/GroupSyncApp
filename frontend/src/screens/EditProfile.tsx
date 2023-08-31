import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import RoundButton from "../components/RoundButton";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import BackButton from "../components/BackButton";

interface EditProfile {
  icon: string;
  title: string;
}

interface EditProfileProps {
  navigation: any; // Replace 'any' with the appropriate navigation type
}

const initialSettings: EditProfile[] = [
  { icon: "person-add-outline", title: "Friend Requests" },
  { icon: "person-circle-outline", title: "Jack" },
  { icon: "person-circle-outline", title: "Maria M" },
  { icon: "person-circle-outline", title: "Noah" },
  // Add more options here
];
export const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
  const [settings, setSettings] = useState<EditProfile[]>(initialSettings);
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const renderItem = ({ item }: { item: EditProfile }) => (
    <TouchableOpacity
      style={{ flexDirection: "row", borderWidth: 1, width: "100%" }}
    >
      <Icon size={32} name={item.icon} />
      <Text style={{ fontSize: 20, textAlignVertical: "center" }}>
        {"  "}
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <BackButton color="black" />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            verticalAlign: "bottom",
            paddingBottom: "0.7%",
            paddingLeft: "20%",
          }}
        >
          Edit Profile
        </Text>
      </View>
      {/* <Icon
        name="person-circle-outline"
        size={128}
        color="black"
        style={{ alignSelf: "center" }}
      /> */}
      <RoundButton></RoundButton>
      <View>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="enter first name here"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="enter last name here"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="enter email here"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="enter password here"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  label: {
    fontSize: 28,
    marginTop: "5%",
    marginLeft: "5%",
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 12,
    marginRight: 10,
    marginLeft: "3%",
  },
  list: {
    width: "109%",
    paddingHorizontal: 16,
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
    fontSize: 32,
    textAlign: "center",
    paddingHorizontal: 50,
  },
});

export default EditProfile;
