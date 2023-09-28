import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";

export const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Generate calendar days for a specific month
  const generateCalendarDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const calendarDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      calendarDays.push({
        day,
        date,
      });
    }

    return calendarDays;
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  const [time, setTime] = useState("");
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>September 2023</Text>
      <View style={styles.daysHeader}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <Text key={index} style={styles.dayText}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {calendarDays.map((dayInfo) => (
          <TouchableOpacity
            key={dayInfo.date.toString()}
            onPress={() => handleDayPress(dayInfo.day)}
            style={[
              styles.calendarDay,
              selectedDay === dayInfo.day && { backgroundColor: "orange" },
            ]}
          >
            <Text
              style={[
                styles.calendarDayText,
                selectedDay === dayInfo.day && { color: "white" },
              ]}
            >
              {dayInfo.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: "10%", marginBottom: "5%" }}>
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={(text) => setTime(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.createButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  calendarDay: {
    width: "14.28%", // 7 days in a week
    textAlign: "center",
    marginVertical: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    alignSelf: "center",
  },
  calendarDayText: {
    fontSize: 18,
  },
  saveButton: {
    width: "80%",
    backgroundColor: "darkorange",
    borderRadius: 45,
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
