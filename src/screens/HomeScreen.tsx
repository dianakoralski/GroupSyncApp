import React from "react";
import { useState } from "react";
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

export const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  const handleTabPress = (tab: "tab1" | "tab2" | "tab3") => {
    setActiveTab(tab);
  };
  const [showScanner, setShowScanner] = useState(false);

  // const handleQRCodeIconPress = () => {
  //   setShowScanner(true);
  // };

  // const handleScannerClose = () => {
  //   setShowScanner(false);
  // };
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
});
