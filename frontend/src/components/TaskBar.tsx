import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";

interface TaskBarProps {
  activeTab: "tab1" | "tab2" | "tab3";
  onTabPress: (tab: "tab1" | "tab2" | "tab3") => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ activeTab, onTabPress }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const handleTabPress = (tab: "tab1" | "tab2" | "tab3") => {
    // Navigate to the corresponding screen based on the tab pressed
    if (tab === "tab1") {
      navigation.navigate("Home");
    } else if (tab === "tab2") {
      navigation.navigate("Tab2Screen");
    } else if (tab === "tab3") {
      navigation.navigate("Profile");
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "tab1" && styles.activeTab]}
        onPress={() => {
          onTabPress("tab1");
          handleTabPress("tab1");
        }}
      >
        <Icon
          name="home-outline"
          size={32}
          color={activeTab === "tab1" ? "red" : "gray"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "tab2" && styles.activeTab]}
        onPress={() => {
          onTabPress("tab2");
          handleTabPress("tab2");
        }}
      >
        <View style={styles.customTabContainer}>
          <View style={styles.customTabUpperHalf}>
            {/* Content outside the taskbar */}
            <Text style={styles.customTabText}>Plan Event</Text>
          </View>
          <View style={styles.customTabLowerHalf}>
            {/* Content within the taskbar */}
            <Image
              source={require("../images/GroupSyncLogo.png")}
              style={styles.tabImage}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "tab3" && styles.activeTab]}
        onPress={() => {
          onTabPress("tab3");
          handleTabPress("tab3");
        }}
      >
        <Icon
          name="person-outline"
          size={32}
          color={activeTab === "tab3" ? "red" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255,179,90,1)",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  tab: {
    padding: 10,
    borderRadius: 50,
  },
  activeTab: {
    backgroundColor: "darkorange", //lightblue
    borderWidth: 1,
    borderColor: "black",
  },
  customTabContainer: {
    alignItems: "center",
    position: "relative",
    top: -50,
  },
  customTabUpperHalf: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    height: 20, // Adjust the height of the upper half outside the taskbar
    justifyContent: "center",
    alignItems: "center",
  },
  customTabText: {
    fontSize: 20,
  },
  customTabLowerHalf: {
    top: -30,
    height: 10, // Adjust the height of the lower half within the taskbar
  },
  tabImage: {
    width: 100,
    height: 100,
    //resizeMode: "contain",
    borderRadius: 150,
    borderWidth: 1,
  },
});

export default TaskBar;
