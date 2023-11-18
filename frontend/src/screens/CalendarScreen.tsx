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
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth()); // "+ 1" is to test month switch
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handlePreviousMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11); // December
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0); // January
    } else {
      setMonth(month + 1);
    }
  };

  const generateCalendarDays = (year: number, month: number) => {
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

  const calendarDays = generateCalendarDays(year, month);
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "5%" }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Text style={styles.navigationText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.header}>
            {new Date(year, month).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.navigationText}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.daysHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <Text key={index} style={styles.dayText}>
                {day}
              </Text>
            )
          )}
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
          <TextInput
            style={styles.input}
            placeholder="Location/Address"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.createButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  navigationText: {
    fontSize: 20,
    fontWeight: "bold",
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
