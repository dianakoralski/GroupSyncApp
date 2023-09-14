import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { API_URL } from "../../context/AuthContext";

interface EventIdProps {
  eventId: number;
}

interface Participant {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const ParticipantsList: React.FC<EventIdProps> = ({ eventId }) => {
  const [participantsData, setParticipantsData] = useState<Participant[]>([]);
  const [visibleParticipants, setVisibleParticipants] = useState(false);

  const handleOnPressParticipants = async () => {
    await axios
      .post(`${API_URL}/eventParticipants/seeAll`, {
        eventId: eventId,
      })
      .then((res) => {
        setParticipantsData(res.data); // Store the participant data in state
        setVisibleParticipants(!visibleParticipants);
      })
      .catch((error) => {
        console.error("couldn't display participants:", error);
      });
  };

  return (
    <View>
      {visibleParticipants ? (
        <>
          <TouchableOpacity>
            <Text
              style={styles.seeHideText}
              onPress={() => handleOnPressParticipants()}
            >
              Hide participants ({participantsData.length})
            </Text>
          </TouchableOpacity>
          <View>
            {participantsData.slice(0, 10).map((item) => (
              <View style={styles.participantItem} key={item.userId}>
                {item.profilePicture ? (
                  <Image
                    source={{
                      uri: item.profilePicture,
                    }}
                    style={styles.profilePicture}
                  />
                ) : (
                  <Icon name="person-circle" size={40} />
                )}
                <Text style={{ marginLeft: "2%" }}>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
            ))}
            {participantsData.length > 10 && (
              <TouchableOpacity
                onPress={() => console.log("load other participants")}
              >
                <Text>Show more...</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <TouchableOpacity>
          <Text
            style={styles.seeHideText}
            onPress={() => handleOnPressParticipants()}
          >
            See participants
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  seeHideText: {
    color: "gray",
    textDecorationLine: "underline",
    marginBottom: "5%",
    alignSelf: "center",
  },
});

export default ParticipantsList;
