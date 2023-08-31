import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { TextInput } from "react-native-gesture-handler";
import BackButton from "../components/BackButton";
import { IconButton } from "react-native-paper";
import { API_URL, useAuth } from "../../context/AuthContext";
import axios from "axios";

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  const { onLogin } = useAuth();
  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
      console.log("error: ", result.msg);
    } else {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(250,155,77,1)", "rgba(250,100,60,1)"]}
        style={styles.gradientBackground}
      >
        <BackButton />

        <View style={styles.body}>
          <Image
            source={require("../images/GroupSyncLogo.png")}
            style={styles.logo}
          />

          <View style={styles.orangeBox}>
            <View style={styles.whiteBox}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                //placeholder="enter email here"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <View style={styles.line}></View>

              <Text style={styles.label}>Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCapitalize="none"
                  style={styles.input}
                  //placeholder="enter password here"
                  value={password}
                  secureTextEntry={isPasswordSecure}
                  onChangeText={(text) => setPassword(text)}
                />
                <IconButton
                  icon={isPasswordSecure ? "eye-off" : "eye"}
                  size={24}
                  onPress={togglePasswordVisibility}
                />
              </View>
              <View style={styles.line}></View>
              <TouchableOpacity
                style={{ marginLeft: "5%", marginTop: "5%" }}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={{ color: "grey", fontSize: 16 }}>
                  Forgot Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ alignSelf: "center", fontSize: 24, marginTop: "5%" }}
            >
              Login using social media
            </Text>
          </View>
          <View style={{ marginBottom: "15%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Text style={{ textDecorationLine: "underline", fontSize: 20 }}>
                Sign up today!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1 },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7%",
  },
  logo: {
    height: 150,
    width: 110,
    borderRadius: 10,
    marginBottom: "7%",
  },
  button: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "rgba(250,160,77,1)",
    padding: 10,
    borderRadius: 40,
    width: 250,
    alignSelf: "center",
    marginBottom: "5%",
  },
  buttonText: {
    color: "black",
    fontSize: 32,
    textAlign: "center",
    paddingHorizontal: 50,
  },
  orangeBox: {
    backgroundColor: "rgba(239,160,79,1)",
    borderRadius: 10,
    width: "85%",
    flex: 1,
    alignItems: "center",
    marginBottom: "15%",
  },
  whiteBox: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
    marginTop: "5%",
  },
  label: {
    fontSize: 28,
    marginTop: "5%",
    marginLeft: "5%",
  },
  input: {
    fontSize: 20,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 12,
    width: "92%",
    marginRight: 10,
    marginLeft: "3%",
  },
  inputContainer: {
    flexDirection: "row", // Align children horizontally
    justifyContent: "space-between",
    width: "80%",
  },
  line: {
    borderWidth: 0.5,
    marginHorizontal: "5%",
  },
});
