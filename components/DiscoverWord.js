import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { BACKEND } from "../App";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function DiscoverWord({ word }) {
  const { user, setUser } = useAuth();
  const [posted, setPosted] = useState(word.usersReposted.includes(user._id));

  async function handleRepost() {
    try {
      let res = await axios.post(`${BACKEND}/words`, {
        _id: user._id,
        word: word.word,
        def: word.def,
        originalPoster: word.originalPoster,
      });
      if (res.status === 201) {
        word.usersReposted.push(user._id);
        setUser(res.data);
        setPosted(true);
        await axios.patch(`${BACKEND}/words`, {
          wordID: word._id,
          userID: user._id,
        });
      }
    } catch (err) {}
  }

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Text style={styles.upperText}>{word.word}</Text>
      </View>
      <Text>{word.def}</Text>
      <View style={styles.lower}>
        <Text>Posted By: {word.userName}</Text>
        <Text>Reposts: {word.usersReposted.length}</Text>
        {!posted ? (
          <Pressable onPress={handleRepost}>
            <Text>Repost</Text>
          </Pressable>
        ) : (
          <Text style={{ color: "#c60" }}>Posted</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    backgroundColor: "#eee",
    padding: 10,
    alignItems: "center",
  },
  upper: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  upperText: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "capitalize",
  },
  lower: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
    paddingTop: 5,
  },
});
