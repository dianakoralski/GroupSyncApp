import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen } from "./src/screens/LandingScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { CreateAccount } from "./src/screens/CreateAccount";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { ConfirmEmail } from "./src/screens/ConfirmEmail";
import { ForgotPassword } from "./src/screens/ForgotPassword";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { FriendsScreen } from "./src/screens/FriendsScreen";
import { EditProfile } from "./src/screens/EditProfile";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import { EventInvitesScreen } from "./src/screens/EventInvitesScreen";

export type StackParams = {
  Landing: object;
  Home: object;
  Login: object;
  CreateAccount: object;
  Profile: object;
  ConfirmEmail: object;
  ForgotPassword: object;
  Settings: object;
  Friends: object;
  EditProfile: object;
  Notifications: object;
  EventInvites: object;
};

const Stack = createStackNavigator<StackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="EventInvites" component={EventInvitesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: { width: 30, height: 30 },
});
