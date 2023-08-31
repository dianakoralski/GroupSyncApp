import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import BackButton from "../components/BackButton";

interface FriendsList {
  icon: string;
  title: string;
}

const initialFriends: FriendsList[] = [
  { icon: "person-add-outline", title: "Friend Requests" },
  { icon: "person-circle-outline", title: "Jack" },
  { icon: "person-circle-outline", title: "Maria M" },
  { icon: "person-circle-outline", title: "Noah" },
  { icon: "person-circle-outline", title: "Bak" },
  // Add more options here
];

export const FriendsScreen: React.FC = () => {
  const [settings, setSettings] = useState<FriendsList[]>(initialFriends);

  const renderItem = ({ item }: { item: FriendsList }) => (
    <TouchableOpacity
      style={{ flexDirection: "row", borderWidth: 1, width: "100%" }}
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
          Friends
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
  button: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "rgba(250,160,77,1)",
    padding: 10,
    borderRadius: 40,
    width: 250,
    alignSelf: "center",
    marginBottom: "5%",
  },
  buttonText: {
    color: "black",
    fontSize: 32,
    textAlign: "center",
    paddingHorizontal: 50,
  },
  list: {
    width: "109%",
    paddingHorizontal: 16,
  },
});

export default FriendsScreen;
