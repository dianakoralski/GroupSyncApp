import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Perform search or filtering logic here
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
    width: "80%",
    borderWidth: 1,
  },
});

export default SearchBar;
