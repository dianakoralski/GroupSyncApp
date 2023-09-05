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

interface FriendRequest {
  icon: string;
  title: string;
}

const initialFriendRequests: FriendRequest[] = [
  { icon: "person-circle-outline", title: "John" },
  { icon: "person-circle-outline", title: "Alice" },
  { icon: "person-circle-outline", title: "Bob" },
  // Add more friend requests here
];

export const FriendRequestsScreen: React.FC = () => {
  const [friendRequests] = useState<FriendRequest[]>(initialFriendRequests);

  const renderItem = ({ item }: { item: FriendRequest }) => (
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
            paddingLeft: "10%",
          }}
        >
          Friend Requests
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={friendRequests}
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
  list: {
    width: "109%",
    paddingHorizontal: 16,
  },
});

export default FriendRequestsScreen;
