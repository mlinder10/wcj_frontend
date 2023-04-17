import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useState } from "react";
import { BACKEND } from "../App";
import { Alert, Platform } from "react-native";
import axios from "axios";

const Context = createContext();

export function useAuth() {
  return useContext(Context);
}

export default function AuthProvider({ children }) {
  const [user, setUser_] = useState();
  const navigation = useNavigation();

  async function setUser(userData) {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser_(userData);
    } catch (err) {}
  }

  async function register(uname, pass) {
    try {
      let res = await axios.post(`${BACKEND}/auth`, {
        uname,
        pass,
      });
      if (res.status === 201) {
        await setUser(res.data);
        navigation.navigate("Personal");
      }
    } catch (err) {
      if (err.response.status === 403) {
        if (Platform.OS === "web") alert("Username Taken");
        else Alert.alert("Username Taken");
      }
    }
  }

  async function login(uname, pass) {
    try {
      let res = await axios.get(`${BACKEND}/auth?uname=${uname}&pass=${pass}`);
      if (res.status === 200) {
        await setUser(res.data);
        navigation.navigate("Personal");
      } else {
        if (Platform.OS === "web") alert("Invalid Credentials");
        Alert.alert("Invalid Credentials", "");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        if (Platform.OS === "web") alert("Incorrect Username Or Password");
        else Alert.alert("Incorrect Username Or Password", "");
      }
    }
  }

  async function logout() {
    try {
      navigation.navigate("Login");
      await setUser(null);
    } catch (err) {}
  }

  useEffect(() => {
    async function getInitialUserValue() {
      const user = await AsyncStorage.getItem("user");
      if (user == undefined) setUser(null);
      setUser_(JSON.parse(user));
      if (user !== null && user !== "null") navigation.navigate("Personal");
    }

    getInitialUserValue();
  }, []);

  return (
    <Context.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </Context.Provider>
  );
}
