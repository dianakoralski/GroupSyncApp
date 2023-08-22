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
    postText: string;
    title: string;
    updatedAt: string;
    username: string;
  }

  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      console.log("accessed host url: ", res.data);
      setListOfPosts(res.data);
    });
  }, []);
  //console.log("listOfPosts: ", listOfPosts);
  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search..." />
      <TouchableOpacity
        style={styles.qrCodeIcon}
        //onPress={handleQRCodeIconPress}
      >
        <Icon name="qr-code-outline" size={38} color="black" />
      </TouchableOpacity>

      {/* {showScanner && <QRCodeScanner onClose={handleScannerClose} />} */}
      <ScrollView>
        <View style={styles.body}>
          <Text>Home Screen</Text>
          {listOfPosts.map((value, key) => {
            return (
              <TouchableOpacity key={key} style={styles.postBox}>
                <Text style={styles.postText}>{value.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
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
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245,245,245,1)",
  },
  footer: { flex: 0.15, backgroundColor: "rgba(255,179,90,1)" },
  qrCodeIcon: {
    position: "absolute",
    top: 30,
    right: 30,
  },
  postBox: {
    width: "80%",
    height: "40%",
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: "5%",
  },
  postText: {
    padding: "5%",
  },
});
