import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import BackButton from "../components/BackButton";
import RoundButton from "../components/RoundButton";

export const CreateAccount = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const today = new Date();
  const minDate = new Date(today);
  minDate.setFullYear(today.getFullYear() - 200);
  const [dateOfBirth, setDateofBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateofBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateofBirth(date.toDateString());
    toggleDatePicker();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(250,155,77,1)", "rgba(250,100,60,1)"]}
        style={styles.gradientBackground}
      >
        <ScrollView>
          <BackButton />

          <View style={styles.body}>
            <RoundButton></RoundButton>
            <Text style={{ marginTop: "2%", marginBottom: "5%" }}>
              Profile Picture
            </Text>

            <View style={styles.whiteBox}>
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="enter first name here"
              />
              <Text style={styles.label}>Last Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="enter last name here"
              />
              <Text style={styles.label}>Date of Birth:</Text>
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  maximumDate={new Date()}
                  style={{ height: "20%" }}
                  minimumDate={minDate}
                />
              )}
              {showPicker && Platform.OS === "ios" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity onPress={toggleDatePicker}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmIOSDate}>
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!showPicker && (
                <Pressable onPress={toggleDatePicker}>
                  <TextInput
                    style={styles.input}
                    placeholder="ex. August 13, 1999"
                    value={dateOfBirth}
                    onChangeText={setDateofBirth}
                    editable={false}
                    onPressIn={toggleDatePicker}
                  />
                </Pressable>
              )}
              <Text style={styles.label}>Email:</Text>
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
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ alignSelf: "center", fontSize: 24, marginTop: "5%" }}
            >
              Login using social media
            </Text>
          </View>
        </ScrollView>
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
    marginBottom: "30%",
  },
  logo: {
    height: 150,
    width: 110,
    borderRadius: 10,
    marginBottom: "7%",
  },
  button: {
    marginTop: "5%",
    alignItems: "center",
    backgroundColor: "rgba(250,160,77,1)",
    padding: 10,
    borderRadius: 40,
    width: 250,
    alignSelf: "center",
    marginBottom: "5%",
    minWidth: "90%",
  },
  buttonText: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: 10,
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
    width: "80%",
    justifyContent: "center",
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
