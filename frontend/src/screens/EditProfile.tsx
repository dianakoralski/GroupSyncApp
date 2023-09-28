import React, { useState, useEffect } from "react";
import RoundButton from "../components/RoundButton";
import axios from "axios";
import { API_URL, useAuth } from "../../context/AuthContext";
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
  const { userState } = useAuth();
  const [id, setId] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(userState?.email);
  const [password, setPassword] = useState("");

  const updateProfile = async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profilePicture: string
  ) => {
    try {
      return await axios.post(`${API_URL}/users/updateProfile`, {
        id,
        firstName,
        lastName,
        email,
        password,
        profilePicture,
      });
    } catch (e) {
      console.log("error:", JSON.stringify(e));
      return { error: true, msg: JSON.stringify(e) };
    }
  };

  useEffect(() => {}, []);

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
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="enter new password here"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // updateProfile(
            //   id,
            //   firstName,
            //   lastName,
            //   email,
            //   password,
            //   profilePicture
            // );
            navigation.navigate("Settings");
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
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
