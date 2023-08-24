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
      <TextInput
        style={styles.inputStyle}
        placeholder="enter password"
        value={password}
        right={
          <TextInput.Icon
            icon={isPasswordSecure ? "eye-off" : "eye"}
            size={28}
            color="grey"
            style={{ paddingTop: 7 }}
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
        <View style={{ flex: 0, marginLeft: "5%" }}>
          <Text style={{ color: "black" }}>Requirements:</Text>
          <Text style={{ color: "black" }}>
            {hasLowerCase ? "✅" : "❌"} Lowercase letter
          </Text>
          <Text style={{ color: "black" }}>
            {hasUpperCase ? "✅" : "❌"} Uppercase letter
          </Text>
          <Text style={{ color: "black" }}>
            {hasNumbers ? "✅" : "❌"} Number
          </Text>
          <Text style={{ color: "black" }}>
            {hasSpecialChars ? "✅" : "❌"} Special character
          </Text>
          <Text style={{ color: "black" }}>
            {password.length >= 8 ? "✅" : "❌"} Minimum of 8 characters
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: "90%",
    height: 30,
    paddingTop: 5,
    fontSize: 20,
    marginLeft: "5%",
    backgroundColor: "transparent",
    marginBottom: "5%",
  },
});

export default PasswordChecker;
