import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Personal from "./screens/Personal";
import Discover from "./screens/Discover";
import AuthProvider from "./context/AuthContext";
import { Platform, View } from "react-native";

export const BACKEND = "https://wcj-backend.onrender.com";
// export const BACKEND = "http://localhost:3000";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Personal"
            component={Personal}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="Discover"
            component={Discover}
            options={{ headerShown: false, animation: "none" }}
          />
        </Stack.Navigator>
        {Platform.OS !== "web" && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 20,
              backgroundColor: "#000",
              borderBottomWidth: 1,
              borderBottomColor: "#c60",
            }}
          />
        )}
      </AuthProvider>
    </NavigationContainer>
  );
}
