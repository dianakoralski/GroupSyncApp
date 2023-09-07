import React, { useState, useEffect } from "react";
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
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import EventDetailScreen from "./EventDetailsPopup";
import { API_URL } from "../../context/AuthContext";

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabPress = (tab: "tab1" | "tab2" | "tab3") => {
    setActiveTab(tab);
  };

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);

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
    axios.get(`${API_URL}/posts`).then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  const [isEventDetailsVisible, setIsEventDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Post | null>(null);

  const showEventDetails = (event: Post) => {
    setSelectedEvent(event);
    setIsEventDetailsVisible(true);
  };

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
      <ScrollView
        style={styles.middleSection}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {listOfPosts.map((value, key) => (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "5%",
                marginBottom: "2%",
              }}
            >
              <Icon name="person-circle-outline" size={48} color="black" />
              <Text style={{ fontSize: 18, paddingLeft: "2%" }}>
                {value.host}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={key}
              style={styles.postBox}
              onPress={() => showEventDetails(value)}
            >
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

      <EventDetailScreen
        isVisible={isEventDetailsVisible}
        onClose={() => setIsEventDetailsVisible(false)}
        eventData={
          selectedEvent
            ? {
                title: selectedEvent.title,
                location: selectedEvent.location,
                date: selectedEvent.date,
                time: selectedEvent.time,
                description: selectedEvent.description,
                host: selectedEvent.host,
              }
            : {
                title: "",
                location: "",
                date: "",
                time: "",
                description: "",
                host: "",
              }
        }
      />
      <View style={styles.bottomSection}>
        <TaskBar activeTab={"tab1"} onTabPress={handleTabPress} />
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
    backgroundColor: "rgba(236, 255, 250, 1)",
  },
  middleSection: {
    flex: 1,
    backgroundColor: "rgba(236, 255, 250, 1)",
    paddingTop: 20,
  },
  bottomSection: {
    backgroundColor: "rgba(255,179,90,1)",
  },
  searchBarContainer: {
    flex: 1,
    paddingRight: 10,
  },
  searchBar: {
    width: "100%",
  },
  qrCodeIcon: {
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
