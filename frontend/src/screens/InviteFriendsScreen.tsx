import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";

import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook

interface FriendsList {
  icon: string;
  title: string;
  selected: boolean; // Add a selected property
}

const initialFriends: FriendsList[] = [
  { icon: "person-circle-outline", title: "Jack", selected: false },
  { icon: "person-circle-outline", title: "Maria M", selected: false },
  { icon: "person-circle-outline", title: "Noah", selected: false },
  { icon: "person-circle-outline", title: "Bak", selected: false },
  // Add more options here
];

export const InviteFriendsScreen: React.FC = () => {
  const [settings, setSettings] = useState<FriendsList[]>(initialFriends);
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const toggleFriendSelection = (index: number) => {
    const updatedSettings = [...settings];
    updatedSettings[index].selected = !updatedSettings[index].selected;
    setSettings(updatedSettings);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: FriendsList;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.friendItem,
        item.selected && styles.selectedFriend, // Apply a different style if selected
      ]}
      onPress={() => toggleFriendSelection(index)} // Toggle the friend's selected state
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
          Invite Friends
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

      {/* bottom section */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.sendInviteButton}
          onPress={() => navigation.navigate("Profile")} // and send the invites to selected Friends
        >
          <Text style={styles.SendInviteButtonText}>Send Invite</Text>
        </TouchableOpacity>
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
  friendItem: {
    flexDirection: "row",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  selectedFriend: {
    backgroundColor: "green", // Change the background color to green when selected
  },
  bottom: {
    alignItems: "center",
    marginTop: "5%",
  },
  sendInviteButton: {
    width: "50%",
    backgroundColor: "orange",
    borderRadius: 45,
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  SendInviteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
