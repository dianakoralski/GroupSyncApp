import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook
import BackButton from "../components/BackButton";
import { useAuth } from "../../context/AuthContext";

interface SettingsOption {
  key: number;
  icon: string;
  title: string;
}

const initialSettings: SettingsOption[] = [
  { key: 0, icon: "pencil-outline", title: "Edit Profile" },
  { key: 1, icon: "notifications-outline", title: "Notifications" },
  { key: 2, icon: "help-outline", title: "Help & Support" },
  { key: 3, icon: "", title: "" },
  { key: 4, icon: "", title: "" },
  { key: 5, icon: "", title: "" },
  { key: 6, icon: "", title: "" },
  { key: 7, icon: "", title: "" },
  { key: 8, icon: "", title: "" },
  { key: 9, icon: "", title: "Log Out" },
  // Add more options here
];

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [settings, setSettings] = useState<SettingsOption[]>(initialSettings);

  const { onLogout } = useAuth();
  const logout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      alert(result.msg);
      console.log("error: ", result.msg);
    } else {
      navigation.navigate("Landing");
    }
  };
  const renderItem = ({ item }: { item: SettingsOption }) => {
    if (item.title == "Log Out") {
      return (
        <TouchableOpacity
          onPress={logout}
          style={{ borderWidth: 1, width: "100%" }}
        >
          <Text
            style={{
              color: "red",
              alignSelf: "center",
              fontSize: 32,
              paddingVertical: "2%",
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={item.key}
          style={{
            flexDirection: "row",
            borderWidth: 1,
            width: "100%",
          }}
          onPress={() => {
            if (item.title === "Edit Profile") {
              navigation.navigate("EditProfile"); // Navigate to "EditProfile" screen
            } else if (item.title === "Notifications") {
              navigation.navigate("Notifications"); // Navigate to "Notifications" screen
            }
          }}
        >
          <Icon size={32} name={item.icon} />
          <Text style={{ fontSize: 32, textAlignVertical: "center" }}>
            {"  "}
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row", marginTop: "5%" }}>
        <BackButton color="black" />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            verticalAlign: "bottom",
            paddingBottom: "0.7%",
            paddingLeft: "20%",
            marginTop: 45,
          }}
        >
          Settings
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={settings}
          renderItem={renderItem}
          keyExtractor={(item) => item.key.toString()}
          style={styles.list}
        />
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
  list: {
    width: "109%",
    paddingHorizontal: 16,
  },
});

export default SettingsScreen;
