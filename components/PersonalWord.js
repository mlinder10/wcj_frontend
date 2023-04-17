import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function Word({ word, remove }) {
  return (
    <View style={styles.wordItem}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{word.word}</Text>
      </View>
      <Text style={{ textAlign: "center" }}>{word.def}</Text>
      <View style={styles.lower}>
        {word.originalPoster === word.userName ? (
          <Text>Reposts: {word.usersReposted.length}</Text>
        ) : (
          <Text>Original Post By: {word.originalPoster}</Text>
        )}
      </View>
      <View style={styles.removeContainer}>
        <Pressable onPress={remove.bind(this, word)}>
          <View style={styles.innerRemove}>
            <Text style={styles.removeText}>-</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wordItem: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  title: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  titleText: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "capitalize",
  },
  removeContainer: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  innerRemove: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d003",
    borderRadius: 2,
  },
  removeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#d00",
    textAlign: "center",
  },
  lower: {
    flexDirection: "row",
    gap: 10,
  },
});
