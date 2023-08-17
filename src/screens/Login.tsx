import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { TextInput } from "react-native-gesture-handler";

export const LoginScreen = () => {
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

          <View style={styles.orangeBox}>
            <View style={styles.whiteBox}>
              <Text>Email:</Text>
              <TextInput placeholder="enter email here" />
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
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
    paddingBottom: 70,
  },
  logo: {
    height: 150,
    width: 110,
    borderRadius: 10,
    marginBottom: 50,
  },
  button: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "rgba(239,160,79,1)",
    padding: 10,
    borderRadius: 40,
    width: 250,
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
  },
  whiteBox: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    flex: 1,
    justifyContent: "center",
  },
});
