import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { API_URL } from "../../context/AuthContext";

interface SearchBarProps {
  placeholder: string;
  onFoundUsers: (users: any) => void; // Specify the function type
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onFoundUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      // If the query is empty or contains only whitespace, set foundUsers to an empty array
      setFoundUsers([]);
      onFoundUsers([]);
    } else {
      axios.post(`${API_URL}/users/all`, { query }).then((res) => {
        const matchingUsers = res.data.matchingUsers;
        setFoundUsers(matchingUsers);
        onFoundUsers(matchingUsers);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
        iconColor="black"
        clearIcon="close"
        inputStyle={{ fontSize: 18 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  searchBar: {
    borderRadius: 25,
    width: "100%",
    borderWidth: 1,
  },
});

export default SearchBar;
