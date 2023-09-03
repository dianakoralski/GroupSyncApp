import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import SearchBar from "../components/SearchBar";
import TaskBar from "../components/TaskBar";
import NotificationButton from "../components/NotificationsButton";
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
          style={styles.qrCodeIcon}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="cog-outline" size={42} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.middleSection}>
        <View style={{ alignItems: "center" }}>
          <Icon name="person-circle-outline" size={128} color="black" />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Friends");
            }}
          >
            <Text style={{ textDecorationLine: "underline" }}>321 Friends</Text>
          </TouchableOpacity>
          <View style={styles.notificationContainer}>
            <NotificationButton />
          </View>
          <View style={{ flex: 0 }}>
            <Slider />
          </View>
        </View>
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
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "rgba(245,245,245,1)",
  },
  bottomSection: {
    flex: 0,
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
  notificationContainer: {
    marginLeft: 80,
    marginTop: -20,
    marginBottom: 30,
  },
});
