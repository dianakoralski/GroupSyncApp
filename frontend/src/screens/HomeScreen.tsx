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
} from "react-native";
import SearchBar from "../components/SearchBar";
import TaskBar from "../components/TaskBar";
//import QRCodeScanner from "../components/QRCodeScanner";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export const HomeScreen = () => {
  //Taskbar tabs
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");
  const handleTabPress = (tab: "tab1" | "tab2" | "tab3") => {
    setActiveTab(tab);
  };

  //QR Scanner
  const [showScanner, setShowScanner] = useState(false);
  // const handleQRCodeIconPress = () => {
  //   setShowScanner(true);
  // };

  // const handleScannerClose = () => {
  //   setShowScanner(false);
  // };

  //Posts data
  interface Post {
    createdAt: string;
    id: number;
    title: string;
    location: string;
    date: string;
    time: string;
    description: string;
    host: string;
    participants: string;
    updatedAt: string;
    username: string;
  }

  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.searchBarContainer}>
          <SearchBar placeholder="Search..." />
        </View>
        <TouchableOpacity style={styles.qrCodeIcon}>
          <Icon name="qr-code-outline" size={38} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.middleSection}>
        {listOfPosts.map((value, key) => (
          <>
            {/* Host name and photo (links to thier profile) */}
            <TouchableOpacity
              key={key}
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginLeft: "10%",
                marginBottom: "2%",
              }}
            >
              <Icon name="person-circle-outline" size={38} color="black" />
              <Text style={{ paddingBottom: "1%" }}> {value.host}</Text>
            </TouchableOpacity>
            {/* event link */}
            <TouchableOpacity key={key} style={styles.postBox}>
              <View style={styles.postText}>
                <Text style={{ fontSize: 25 }}>{value.title}</Text>
                <Text style={{ fontSize: 18 }}>{value.location}</Text>
                <Text style={{ fontSize: 18 }}>{value.date}</Text>
                <Text style={{ fontSize: 18 }}>{value.time}</Text>
              </View>
            </TouchableOpacity>
          </>
        ))}
      </ScrollView>
      <View style={styles.bottomSection}>
        <TaskBar activeTab={activeTab} onTabPress={handleTabPress} />
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
