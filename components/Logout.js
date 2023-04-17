import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../context/AuthContext";
import { View, Text, StyleSheet } from "react-native";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <View style={styles.inner}>
          <Text style={styles.text}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 40,
  },
  text: {
    color: "#000",
    fontWeight: "bold",
  },
  inner: {
    backgroundColor: "#c60",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
