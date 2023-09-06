import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface RoundButtonProps {
  onImageSelected: (imageUri: string) => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({ onImageSelected }) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets![0];
      setImage(uri);

      // Call the callback function with the selected image URI
      onImageSelected(uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.buttonContainer}>
      <View style={styles.button}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <AntDesign name="plus" size={32} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default RoundButton;
