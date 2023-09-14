import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import SearchBar from "../components/SearchBar";

import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

interface FriendsList {
  icon: string;
  title: string;
}

interface User {
  firstName: string;
  lastName: string;
}
const initialFriends: FriendsList[] = [
  { icon: "person-add-outline", title: "Friend Requests" },
  { icon: "person-circle-outline", title: "Jack" },
  { icon: "person-circle-outline", title: "Maria M" },
  { icon: "person-circle-outline", title: "Noah" },
  { icon: "person-circle-outline", title: "Bak" },
  // Add more options here
];

export const SearchScreen: React.FC = () => {
  const [settings] = useState<FriendsList[]>(initialFriends);
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [foundUsers, setFoundUsers] = useState<User[]>([]); // Specify User[] as the type
  const handleFoundUsers = (users: any) => {
    setFoundUsers(users);
  };
  const renderItem = ({ item }: { item: FriendsList }) => (
    <TouchableOpacity
      style={{ flexDirection: "row", borderWidth: 1, width: "100%" }}
      onPress={() => {
        if (item.title === "Friend Requests") {
          navigation.navigate("FriendRequests");
        }
      }}
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
      <View style={styles.topSection}>
        <View style={styles.rowContainer}>
          <View style={{ marginTop: "-2.7%" }}>
            <BackButton color="black" />
          </View>
          <View style={styles.searchBarContainer}>
            <SearchBar
              placeholder="Search..."
              onFoundUsers={handleFoundUsers}
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={settings}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          style={styles.list}
        />
        {foundUsers && foundUsers.length > 0 ? (
          foundUsers.map((value, key) => (
            <View key={key} style={{ marginBottom: "5%" }}>
              {/* event link */}
              <TouchableOpacity key={key}>
                <View>
                  <Text style={{ fontSize: 25 }}>{value.firstName}</Text>
                  <Text style={{ fontSize: 18 }}>{value.lastName}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No users found</Text>
        )}
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
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#f5f5f5",
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
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  searchBarContainer: {
    flex: 1,
    paddingRight: 10,
  },
});

export default SearchScreen;
