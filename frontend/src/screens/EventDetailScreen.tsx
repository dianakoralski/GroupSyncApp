import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

interface EventDetail {
  isVisible: boolean;
  onClose: () => void;
  eventData: {
    title: string;
    host: string;
    location: string;
    date: string;
    time: string;
    description: string;
  };
}

export const EventDetailScreen: React.FC<EventDetail> = ({
  isVisible,
  onClose,
  eventData,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{eventData.title}</Text>
          <Text>Host: {eventData.host}</Text>
          <Text>{eventData.location}</Text>
          <Text>{eventData.date}</Text>
          <Text>{eventData.time}</Text>
          <Text>{eventData.description}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default EventDetailScreen;
