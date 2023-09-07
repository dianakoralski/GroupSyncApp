import { useAuth, AuthProvider } from "./context/AuthContext";
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
import { CreateEvent } from "./src/screens/CreateEvent";
import { FriendRequestsScreen } from "./src/screens/FriendRequestsScreen";

import { Button } from "react-native";
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
  CreateEvent: object;
  FriendRequests: object;
  EventDetails: object;
};

const Stack = createStackNavigator<StackParams>();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerRight: () => (
                  <Button onPress={onLogout} title="Sign Out" />
                ),
              }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="EventInvites" component={EventInvitesScreen} />
            <Stack.Screen name="CreateEvent" component={CreateEvent} />
            <Stack.Screen
              name="FriendRequests"
              component={FriendRequestsScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
