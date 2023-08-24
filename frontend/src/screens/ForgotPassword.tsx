import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { TextInput } from "react-native-gesture-handler";
import BackButton from "../components/BackButton";

export const ForgotPassword = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [email, setEmail] = useState("");
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
              <Text style={styles.label}>Reset Password</Text>

              <Text
                style={{ fontSize: 18, marginLeft: "5%", marginTop: "10%" }}
              >
                email:
              </Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.line}></View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("Login");
                  console.log(
                    "send email to reset password and print out confirmation that email was sent"
                  );
                }}
              >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textOptions}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16 }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Back to Sign in
              </Text>
            </View>
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
    marginBottom: "50%",
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
    fontSize: 30,
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
  smallerLabel: {
    fontSize: 14,
    marginLeft: "5%",
    marginTop: "10%",
  },
  textOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "7%",
  },
});
