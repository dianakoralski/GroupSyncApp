import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BackButton from "../components/BackButton";

export const EventChatScreen: React.FC = (navigation) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  //const eventData=navigation.params?.eventData || {};

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: "5%" }}>
        <BackButton color="black" />
        {/* <Text>{eventData.title}</Text> */}
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  messageBubble: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    padding: 8,
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 16,
    backgroundColor: "orange",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: "#fff",
  },
});
