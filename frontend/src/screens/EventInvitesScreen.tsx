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
import BackButton from "../components/BackButton";
import { API_URL } from "../../context/AuthContext";

export const EventInvitesScreen = () => {
  //Taskbar tabs
  const [activeTab, setActiveTab] = useState("tab1");
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
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    // Perform your data fetching here, e.g. call axios.get(...)
    axios
      .get(`${API_URL}/posts`)
      .then((res) => {
        setListOfPosts(res.data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Error refreshing data:", error);
        setRefreshing(false);
      });
  };

  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get(`${API_URL}/posts`).then((res) => {
      setListOfPosts(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={{ flexDirection: "row" }}>
          <BackButton color="black" />
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar placeholder="Search..." />
        </View>
      </View>
      <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 32 }}>
        Invites
      </Text>
      <ScrollView
        style={styles.middleSection}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {listOfPosts.map((value, key) => (
          <View key={key}>
            {/* Host name and photo (links to thier profile) */}
            <TouchableOpacity
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
            <TouchableOpacity style={styles.postBox}>
              <View style={styles.postText}>
                <Text style={{ fontSize: 25 }}>{value.title}</Text>
                <Text style={{ fontSize: 18 }}>{value.location}</Text>
                <Text style={{ fontSize: 18 }}>{value.date}</Text>
                <Text style={{ fontSize: 18 }}>{value.time}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
