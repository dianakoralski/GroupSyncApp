import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import SearchBar from "../components/SearchBar";
import TaskBar from "../components/TaskBar";
//import QRCodeScanner from "../components/QRCodeScanner";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export const ProfileScreen = () => {
  //Taskbar tabs
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
        <TouchableOpacity style={styles.qrCodeIcon}>
          <Icon name="cog-outline" size={42} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.middleSection}>
        <Text>Profile Page</Text>
      </ScrollView>
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
  },
  middleSection: {
    flex: 1,
    backgroundColor: "rgba(245,245,245,1)",
    marginTop: 20,
  },
  bottomSection: {
    flex: 0.15,
    backgroundColor: "rgba(255,179,90,1)",
  },
  searchBarContainer: {
    flex: 1,
    paddingRight: 10, // Add some spacing between search bar and QR icon
  },
  searchBar: {
    width: "100%", // Adjust the width as needed
  },
  qrCodeIcon: {
    paddingRight: 20,
    paddingTop: 10,
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
