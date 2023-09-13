import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../components/SearchBar";
import TaskBar from "../components/TaskBar";
import Icon from "react-native-vector-icons/Ionicons";
import Slider from "../components/Slider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";

export const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [activeTab, setActiveTab] = useState("tab3");
  const handleTabPress = (tab: "tab1" | "tab2" | "tab3") => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.searchBarContainer}>
          <SearchBar placeholder="Search..." />
        </View>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="cog-outline" size={42} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", height: "76%" }}>
        <Slider />
      </View>
      <View style={styles.bottomSection}>
        <TaskBar activeTab={"tab3"} onTabPress={handleTabPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(245,245,245,1)",
    marginTop: "10%",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#f5f5f5",
  },
  middleSection: {
    alignSelf: "center",
    backgroundColor: "rgba(236, 255, 250, 1)",
  },
  bottomSection: {
    backgroundColor: "rgba(255,179,90,1)",
  },
  searchBarContainer: {
    flex: 1,
    paddingRight: 10, // Add some spacing between search bar and QR icon
  },
  searchBar: {
    width: "100%", // Adjust the width as needed
  },
  settingsIcon: {
    paddingRight: 20,
  },
  postBox: {
    width: "80%",
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: "center",
  },
  postText: {
    padding: 10,
  },
});
