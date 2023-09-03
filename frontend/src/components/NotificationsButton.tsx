import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";

interface NotificationButtonProps {
  color?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const handleBackPress = () => {
    navigation.navigate("FriendRequests");
  };

  return (
    <TouchableOpacity
      style={styles.redDot}
      onPress={handleBackPress}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 0.5,
  },
});

export default NotificationButton;
