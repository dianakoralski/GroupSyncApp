import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  userState?: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    email: string;
    password: string | null;
    profilePicture: string | null;
  };
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    password: string,
    profilePicture: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
const USER_DATA = "user_data_key"; // Valid key name

export const API_URL = `http://localhost:3001`;

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  const [userState, setUserState] = useState<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    email: string;
    password: string | null;
    profilePicture: string | null;
  }>({
    id: 0,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    email: "",
    password: null,
    profilePicture: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        //Removed Bearer
        axios.defaults.headers.common["Authorization"] = `${token}`;
        setAuthState({ token: token, authenticated: true });
      }
    };

    const loadUser = async () => {
      const userString = await SecureStore.getItemAsync(USER_DATA);
      if (userString) {
        const user = JSON.parse(userString); // Parse the user string into an object
        setUserState(user);
      }
    };
    loadToken();
    loadUser();
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    password: string,
    profilePicture: string
  ) => {
    try {
      return await axios.post(`${API_URL}/users`, {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password,
        profilePicture,
      });
    } catch (e) {
      console.log("error:", JSON.stringify(e));
      // if (axios.isAxiosError(e))
      //   console.log("E:", e);
      return { error: true, msg: JSON.stringify(e) };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, { email, password });
      if (result.status != 200 || result.data == null) {
        return { error: true, msg: "Login failed" };
      }

      setAuthState({ token: result.data.token, authenticated: true });

      const updatedUserState = {
        id: result.data.userInfo.id,
        firstName: result.data.userInfo.firstName,
        lastName: result.data.userInfo.lastName,
        dateOfBirth: result.data.userInfo.dateOfBirth,
        email: result.data.userInfo.email,
        password: null,
        profilePicture: result.data.userInfo.profilePicture,
      };

      // Set the user state
      setUserState(updatedUserState);

      // Store the updated user state in SecureStore
      await SecureStore.setItemAsync(
        USER_DATA,
        JSON.stringify(updatedUserState)
      );

      //Removed Bearer
      axios.defaults.headers.common["Authorization"] = `${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return result;
    } catch (e) {
      return { error: true, msg: "Invalid login" };
      //return { error: true, msg: (e as any).message };
    }
  };

  const logout = async () => {
    try {
      SecureStore.deleteItemAsync(TOKEN_KEY);
      SecureStore.deleteItemAsync("user-data");

      axios.defaults.headers.common["Authorization"] = "";

      setAuthState({ token: null, authenticated: false });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    userState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
