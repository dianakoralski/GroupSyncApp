import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface PasswordCheckerProps {
  setPasswordCallback: (password: string) => void;
}

const PasswordChecker: React.FC<PasswordCheckerProps> = ({
  setPasswordCallback,
}) => {
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <View>
      <Text style={styles.txtStyle}>Password</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Type Here"
        value={password}
        mode="outlined"
        theme={{ roundness: 20 }}
        right={
          <TextInput.Icon
            icon={isPasswordSecure ? "eye-off" : "eye"}
            size={28}
            color="black"
            onPress={() => {
              setIsPasswordSecure(!isPasswordSecure);
            }}
          />
        }
        secureTextEntry={isPasswordSecure}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordCallback(text);
        }}
      />
      {password.length > 0 && (
        <View style={{ flex: 0 }}>
          <Text style={{ color: "white" }}>Requirements:</Text>
          <Text style={{ color: "white" }}>
            {hasLowerCase ? "✅" : "❌"} Lowercase letter
          </Text>
          <Text style={{ color: "white" }}>
            {hasUpperCase ? "✅" : "❌"} Uppercase letter
          </Text>
          <Text style={{ color: "white" }}>
            {hasNumbers ? "✅" : "❌"} Number
          </Text>
          <Text style={{ color: "white" }}>
            {hasSpecialChars ? "✅" : "❌"} Special character
          </Text>
          <Text style={{ color: "white" }}>
            {password.length >= 8 ? "✅" : "❌"} Minimum of 8 characters
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: 350,
    height: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
  },
  txtStyle: {
    color: "white",
    marginLeft: 10,
    paddingTop: 10,
  },
});

export default PasswordChecker;
