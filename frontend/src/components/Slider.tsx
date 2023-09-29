import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StackParams } from "../../App";
import { API_URL, useAuth } from "../../context/AuthContext";
import NotificationButton from "../components/NotificationsButton";
import RouteOneEventPopup from "../popups/RouteOneEventPopup";
import RouteTwoEventPopup from "../popups/RouteTwoEventPopup";

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
  hostName: string;
  hostId: number;
  participants: string;
  updatedAt: string;
  username: string;
}

const FirstRoute = () => {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get(`${API_URL}/posts`).then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const { userState } = useAuth();
  useEffect(() => {}, []);

  const [isEventDetailsVisible, setIsEventDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Post | null>(null);

  const showEventDetails = (post: Post) => {
    setSelectedEvent(post);
    setIsEventDetailsVisible(true);
  };
  const selfHostedPosts = listOfPosts.filter(
    (value) => value.hostId === userState?.id
  );

  return (
    <View style={[styles.scene]}>
      <ScrollView style={{ width: "100%", marginTop: "5%" }}>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity>
            {userState?.profilePicture ? (
              <Image
                source={{ uri: userState?.profilePicture }}
                style={styles.profileButton}
              />
            ) : (
              <Icon name="person-outline" size={32} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("Friends");
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                alignSelf: "center",
                marginBottom: "5%",
              }}
            >
              321 Friends
            </Text>
            <NotificationButton />
          </TouchableOpacity>
        </View>
        {selfHostedPosts.map((value, key) => (
          <View key={key} style={{ marginBottom: "5%" }}>
            {/* event link */}
            <TouchableOpacity
              key={key}
              style={styles.postBox}
              onPress={() => showEventDetails(value)} // Use showEventDetails instead of showPostDetails
            >
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
      <RouteOneEventPopup
        isVisible={isEventDetailsVisible}
        onClose={() => setIsEventDetailsVisible(false)}
        eventData={
          selectedEvent
            ? {
                id: selectedEvent.id,
                title: selectedEvent.title,
                location: selectedEvent.location,
                date: selectedEvent.date,
                time: selectedEvent.time,
                description: selectedEvent.description,
                hostId: selectedEvent.hostId,
                hostName: selectedEvent.hostName,
              }
            : {
                id: 0,
                title: "",
                location: "",
                date: "",
                time: "",
                description: "",
                hostId: 0,
                hostName: "",
              }
        }
      />
    </View>
  );
};

const SecondRoute = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);

  const { userState } = useAuth();
  useEffect(() => {
    axios
      .post(`${API_URL}/eventParticipants/eventsByUser`, {
        userId: userState?.id,
      })
      .then((res: any) => {
        setListOfPosts(res.data);
      })
      .catch((error) => {
        console.error("couldn't display RSVPd events:", error);
      });
  }, []);

  const [isEventDetailsVisible, setIsEventDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Post | null>(null);

  const showEventDetails = (post: Post) => {
    setSelectedEvent(post);
    setIsEventDetailsVisible(true);
  };

  return (
    <View style={[styles.scene]}>
      <ScrollView
        style={{
          width: "100%",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "center", paddingBottom: "5%" }}
          onPress={() => {
            navigation.navigate("CalendarScreen");
          }}
        >
          <Icon name="calendar-outline" size={64}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("EventInvites")}>
          <Text
            style={{
              textDecorationLine: "underline",
              marginBottom: "5%",
              marginLeft: "5%",
            }}
          >
            2 Pending invites to Event
          </Text>
        </TouchableOpacity>
        {listOfPosts.map((value, key) => (
          <View
            key={key}
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-start",
                marginBottom: "2%",
                marginLeft: "5%",
              }}
            >
              <Icon name="person-circle-outline" size={48} color="black" />
              <Text style={{ fontSize: 18, paddingLeft: "2%" }}>
                {value.hostName}
              </Text>
            </TouchableOpacity>

            <>
              {/* event link */}
              <TouchableOpacity
                style={styles.postBox}
                onPress={() => showEventDetails(value)} // Use showEventDetails instead of showPostDetails
              >
                <View style={styles.postText}>
                  <Text style={{ fontSize: 25 }}>{value.title}</Text>
                  <Text style={{ fontSize: 18 }}>{value.location}</Text>
                  <Text style={{ fontSize: 18 }}>{value.date}</Text>
                  <Text style={{ fontSize: 18 }}>{value.time}</Text>
                </View>
              </TouchableOpacity>
            </>
          </View>
        ))}
      </ScrollView>
      <RouteTwoEventPopup
        isVisible={isEventDetailsVisible}
        onClose={() => setIsEventDetailsVisible(false)}
        onLeave={(id) =>
          setListOfPosts(listOfPosts.filter((post) => post.id != id))
        }
        eventData={
          selectedEvent
            ? {
                id: selectedEvent.id,
                title: selectedEvent.title,
                location: selectedEvent.location,
                date: selectedEvent.date,
                time: selectedEvent.time,
                description: selectedEvent.description,
                hostId: selectedEvent.hostId,
                hostName: selectedEvent.hostName,
              }
            : {
                id: 0,
                title: "",
                location: "",
                date: "",
                time: "",
                description: "",
                hostId: 0,
                hostName: "",
              }
        }
      />
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
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    width: "100%",
    alignSelf: "center",
  },
  tabBar: {
    backgroundColor: "white",
    borderWidth: 1,
    width: 300,
    borderRadius: 30,
    marginLeft: 50,
    marginRight: 50,
  },
  indicator: {
    backgroundColor: "orange",
    height: "20%",
    width: "45%", // 130
    borderRadius: 30,
    paddingBottom: 37,
    marginLeft: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  tabLabel: {
    color: "blue", // Customize the text color here
    fontWeight: "bold",
    textTransform: "capitalize", // If you want to capitalize the text
  },
  postBox: {
    width: "80%",
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: "center",
  },
  postText: {
    padding: 10,
  },
  profileButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
});

export default Slider;
