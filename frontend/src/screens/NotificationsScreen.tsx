import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Message",
    message: "You have a new message from John Doe.",
    read: false,
  },
  {
    id: "2",
    title: "Friend Request",
    message: "You received a friend request from Jane Smith.",
    read: true,
  },
  // Add more notifications here
];

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={[styles.notification, item.read && styles.readNotification]}>
      <Icon
        name="notifications"
        size={24}
        color={item.read ? "#888" : "#faa04d"}
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  readNotification: {
    opacity: 0.6,
  },
  notificationContent: {
    marginLeft: 12,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
  },
});

export default NotificationScreen;
