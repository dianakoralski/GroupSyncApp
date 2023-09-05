import React, { useState, useEffect } from "react";
import RoundButton from "../components/RoundButton";
import axios from "axios";
import { API_URL } from "../../context/AuthContext";
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
export const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios.get(`${API_URL}/users/user`).then((res) => {
      setUserData(res.data.userInfo);
      console.log("User Data:", res.data.userInfo);
    });
  }, []);

  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <RoundButton
        onImageSelected={(image_URI) => setProfilePicture(image_URI)}
      ></RoundButton>
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
