import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import NewWord from "./NewWord";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Nav({ current }) {
  const [adding, setAdding] = useState(false);
  const navigation = useNavigation();

  function handleNavigate(screen) {
    navigation.replace(screen);
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <TouchableOpacity onPress={handleNavigate.bind(this, "Personal")}>
          <View
            style={{
              ...styles.button,
              backgroundColor: current === "personal" ? "#c60" : "ddd",
            }}
          >
            <Text style={styles.text}>Personal</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={setAdding.bind(this, true)}>
          <View style={styles.addButton}>
            <Text style={styles.addText}>New Word</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }}>
        <TouchableOpacity onPress={handleNavigate.bind(this, "Discover")}>
          <View
            style={{
              ...styles.button,
              backgroundColor: current === "discover" ? "#c60" : "ddd",
            }}
          >
            <Text style={styles.text}>Discover</Text>
          </View>
        </TouchableOpacity>
      </View>
      <NewWord visible={adding} setVisible={setAdding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
  },
  button: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
  },
  addContainer: {
    flex: 1,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: "#000",
  },
  addText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#c60",
    textAlign: "center",
  },
});
