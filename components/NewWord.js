import {
  Text,
  Modal,
  TextInput,
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { BACKEND } from "../App";
import { useAuth } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default function NewWord({ visible, setVisible }) {
  const { user, setUser } = useAuth();
  const [word, setWord] = useState("");
  const [def, setDef] = useState("");
  const [words, setWords] = useState([]);

  async function handleSearch() {
    try {
      let res = await axios.get(`${API}${word}`);
      setWords(res.data[0].meanings[0].definitions);
    } catch (err) {
      if (err.response.status === 404) {
        return alert(`No Definitions Found For "${word}"`);
      }
    }
  }

  async function handlePost() {
    try {
      let res = await axios.post(`${BACKEND}/words`, {
        _id: user._id,
        word: word,
        def: def,
      });
      setUser(res.data);
      setWord("");
      setDef("");
      setWords([]);
      setVisible(false);
    } catch (err) {}
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.upper} behavior="padding">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter a Word"
              value={word}
              onChange={(text) => setWord(text.nativeEvent.text)}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSearch}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter a Definition"
              value={def}
              onChange={(text) => setDef(text.nativeEvent.text)}
              style={styles.input}
            />
            <TouchableOpacity onPress={handlePost}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Post</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <ScrollView
          style={styles.results}
          contentContainerStyle={styles.contentContainer}
        >
          {words.map((w) => (
            <View style={styles.wordContainer} key={w.definition}>
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={setDef.bind(this, w.definition)}
              >
                <Text style={{ color: w.definition === def ? "#c60" : "#000" }}>
                  {w.definition}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          {words.length === 0 && <Text>Search For a Word</Text>}
        </ScrollView>
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={setVisible.bind(this, false)}>
            <View style={styles.innerClose}>
              <Text style={styles.closeText}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    flex: 1,
  },
  upper: {
    padding: 40,
    gap: 20,
    paddingTop: 70,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "60%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  button: {
    backgroundColor: "#c60",
    borderRadius: 10,
    paddingVertical: 10,
    width: 80,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
  },
  closeContainer: {
    position: "absolute",
    top: 0,
    right: "50%",
    transform: "translateX(50%)",
  },
  innerClose: {
    width: 80,
    height: 40,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  closeText: {
    fontWeight: "700",
  },
  results: {
    margin: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 15,
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  wordContainer: {
    backgroundColor: "#eee",
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
