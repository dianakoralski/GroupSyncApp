import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from "axios";

type TabRoute = {
  key: string;
  title: string;
};

//Posts data
interface Post {
  createdAt: string;
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  host: string;
  participants: string;
  updatedAt: string;
  username: string;
}

const FirstRoute = () => {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);
  return (
    <View style={[styles.scene]}>
      <ScrollView style={{ width: "100%", marginTop: "5%" }}>
        {listOfPosts.map((value, key) => (
          <View key={key}>
            {/* Host name and photo (links to thier profile) */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginBottom: "2%",
              }}
            >
              <Icon name="person-circle-outline" size={38} color="black" />
              <Text style={{ paddingBottom: "1%" }}> {value.host}</Text>
            </TouchableOpacity>
            {/* event link */}
            <TouchableOpacity style={styles.postBox}>
              <View style={styles.postText}>
                <Text style={{ fontSize: 25 }}>{value.title}</Text>
                <Text style={{ fontSize: 18 }}>{value.location}</Text>
                <Text style={{ fontSize: 18 }}>{value.date}</Text>
                <Text style={{ fontSize: 18 }}>{value.time}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const SecondRoute = () => {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("http://10.0.2.2:3001/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);
  return (
    <View style={[styles.scene]}>
      <ScrollView style={{ width: "100%", marginTop: "5%" }}>
        {listOfPosts.map((value, key) => (
          <View key={key}>
            {/* Host name and photo (links to thier profile) */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginBottom: "2%",
              }}
            >
              <Icon name="person-circle-outline" size={38} color="black" />
              <Text style={{ paddingBottom: "1%" }}> {value.host}</Text>
            </TouchableOpacity>
            {/* event link */}
            <TouchableOpacity style={styles.postBox}>
              <View style={styles.postText}>
                <Text style={{ fontSize: 25 }}>{value.title}</Text>
                <Text style={{ fontSize: 18 }}>{value.location}</Text>
                <Text style={{ fontSize: 18 }}>{value.date}</Text>
                <Text style={{ fontSize: 18 }}>{value.time}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const initialRoutes: TabRoute[] = [
  { key: "first", title: "My Events" },
  { key: "second", title: "RSVP'd" },
];

const Slider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(initialRoutes);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel} // Add this line to customize text color
          />
        )}
      />
      <Text>Inside</Text>
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: "white",
    borderWidth: 1,
    width: 300,
    borderRadius: 30,
  },
  indicator: {
    backgroundColor: "orange",
    height: "20%",
    width: "45%", // 130
    borderRadius: 30,
    paddingBottom: 40,
    marginLeft: 10,
    marginBottom: 5,
  },
  tabLabel: {
    color: "blue", // Customize the text color here
    fontWeight: "bold",
    textTransform: "capitalize", // If you want to capitalize the text
  },
  postBox: {
    width: "100%",
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  postText: {
    padding: 10,
  },
});

export default Slider;
