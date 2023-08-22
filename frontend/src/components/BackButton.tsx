import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  color?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ color = "white" }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleBackPress}>
      <Icon name="arrow-back" size={32} style={{ color: color }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 5,
    marginLeft: "4%",
    marginTop: "10%",
  },
});

export default BackButton;
