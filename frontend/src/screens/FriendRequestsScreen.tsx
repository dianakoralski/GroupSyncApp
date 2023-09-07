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

  const handleAccept = (friendRequest: FriendRequest) => {
    // Handle the logic for accepting the friend request here
    // You can remove the friendRequest from the friendRequests state or update it as per your requirement
  };
  const handleDecline = (friendRequest: FriendRequest) => {
    // Handle the logic for declining the friend request here
    // You can remove the friendRequest from the friendRequests state or update it as per your requirement
  };
  const renderItem = ({ item }: { item: FriendRequest }) => (
    <View style={{ flexDirection: "row", borderWidth: 1, width: "100%" }}>
      <Icon size={32} name={item.icon} />
      <Text style={{ fontSize: 20, textAlignVertical: "center" }}>
        {"  "}
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAccept(item)}
      >
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleDecline(item)}
      >
        <Text style={styles.buttonText}>Decline</Text>
      </TouchableOpacity>
    </View>
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
  button: {
    backgroundColor: "orange", // Change the button background color as needed
    padding: 8,
    borderRadius: 5,
    marginLeft: 40, // Add some margin between buttons and the name
  },
  buttonText: {
    color: "white", // Change the text color as needed
    fontSize: 16,
  },
});

export default FriendRequestsScreen;
