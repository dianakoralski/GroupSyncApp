import React from "react";
import { useEffect } from "react";
import axios from "axios";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { TextInput } from "react-native-gesture-handler";
import BackButton from "../components/BackButton";

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

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
              <Text style={styles.label}>Email / Username:</Text>
              <TextInput style={styles.input} placeholder="enter email here" />
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="enter password here"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
              >
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
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 12,
    marginRight: 10,
    marginLeft: "3%",
  },
});
