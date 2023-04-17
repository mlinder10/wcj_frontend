import { View, ScrollView, StyleSheet, Text } from "react-native";
import axios from "axios";
import { BACKEND } from "../App";
import Nav from "../components/Nav";
import Word from "../components/PersonalWord";
import { useAuth } from "../context/AuthContext";
import Logout from "../components/Logout";

export default function Personal() {
  const { user, setUser } = useAuth();

  async function handleRemove(word) {
    try {
      let res = await axios.delete(
        `${BACKEND}/words?userID=${user._id}&wordID=${word._id}`
      );
      setUser(res.data);
    } catch (err) {}
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.wordsContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {user.words?.map((w) => (
          <Word word={w} key={w._id} remove={handleRemove} />
        ))}
        {user.words.length === 0 && <Text>No Entered Words</Text>}
      </ScrollView>
      <Logout />
      <Nav current="personal" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordsContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: "#ddd",
  },
  contentContainer: {
    alignItems: "center",
    gap: 20,
  },
});
