import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { API_URL } from "../../context/AuthContext";

interface SearchBarProps {
  placeholder: string;
  onFoundUsers: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onFoundUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    axios.post(`${API_URL}/users/all`, { query }).then((res) => {
      setFoundUsers(res.data.matchingUsers);
      console.log("found: ", foundUsers);
      onFoundUsers(foundUsers);
    });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
        iconColor="black" // Customize the icon color
        clearIcon="close" // Use 'close' to show a clear icon when text is entered
        inputStyle={{ fontSize: 18 }} // Customize the font size of the input text
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
