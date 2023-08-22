import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";

export const LandingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(250,155,77,1)", "rgba(250,100,60,1)"]}
        style={styles.gradientBackground}
      >
        <View style={styles.body}>
          <Image
            source={require("../images/GroupSyncLogo.png")}
            style={styles.logo}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
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
    paddingBottom: 70,
  },
  logo: {
    height: 300,
    width: 250,
    borderRadius: 10,
    marginBottom: 50,
  },
  button: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 250,
  },
  buttonText: {
    color: "black",
    fontSize: 32,
    textAlign: "center",
    paddingHorizontal: 50,
  },
});
