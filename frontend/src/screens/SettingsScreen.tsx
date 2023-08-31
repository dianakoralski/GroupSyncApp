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

interface SettingsOption {
  icon: string;
  title: string;
}

const initialSettings: SettingsOption[] = [
  { icon: "pencil-outline", title: "Edit Profile" },
  { icon: "notifications-outline", title: "Notifications" },
  { icon: "help-outline", title: "Help & Support" },
  // Add more options here
];

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [settings, setSettings] = useState<SettingsOption[]>(initialSettings);

  const renderItem = ({ item }: { item: SettingsOption }) => (
    <TouchableOpacity
      style={{ flexDirection: "row", borderWidth: 1, width: "100%" }}
      onPress={() => {
        if (item.title === "Edit Profile") {
          navigation.navigate("EditProfile"); // Navigate to "EditProfile" screen
        } else if (item.title === "Notifications") {
          navigation.navigate("Notifications"); // Navigate to "Notifications" screen
        }
      }}
    >
      <Icon size={32} name={item.icon} />
      <Text style={{ fontSize: 20, textAlignVertical: "center" }}>
        {"  "}
        {item.title}
      </Text>
    </TouchableOpacity>
  );

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
          Settings
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={settings}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
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
