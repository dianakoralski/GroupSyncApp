import { StyleSheet, Text, View } from "react-native";
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
