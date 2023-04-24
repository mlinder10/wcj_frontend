import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND } from "../App";
import Nav from "../components/Nav";
import DiscoverWord from "../components/DiscoverWord";
import { useAuth } from "../context/AuthContext";
import Logout from "../components/Logout";

export default function Discover() {
  const { user } = useAuth();
  const [words, setWords] = useState(null);

  useEffect(() => {
    async function getWords() {
      try {
        let res = await axios.get(`${BACKEND}/words?_id=${user._id}`);
        setWords(res.data);
      } catch (err) {}
    }

    getWords();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.wordsContainer}
      >
        {words?.map((w) => (
          <DiscoverWord word={w} key={w._id} />
        ))}
        {words === null && (
          <Image
            source={require("../assets/loading.gif")}
            style={{ width: 50, height: 50, flex: 1 }}
          />
        )}
        {words?.length === 0 && <Text>No New Words</Text>}
      </ScrollView>
      <Logout />
      <Nav current="discover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordsContainer: {
    flex: 1,
    paddingVertical: 80,
    backgroundColor: "#ddd",
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 20,
  },
});
