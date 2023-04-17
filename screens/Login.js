import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { BACKEND } from "../App";
import { useAuth } from "../context/AuthContext";

const INVALIDS = {
  NONE: 0,
  UNAME: 1,
  PASSWORD: 2,
  BOTH: 3,
};

export default function Login() {
  const { login, register } = useAuth();
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [invalids, setInvalids] = useState(INVALIDS.NONE);

  async function handleLogin(type) {
    if (uname === "" && pass === "") return setInvalids(INVALIDS.BOTH);
    if (uname === "") return setInvalids(INVALIDS.UNAME);
    if (pass === "") return setInvalids(INVALIDS.PASSWORD);

    if (type === "login") await login(uname, pass);
    else await register(uname, pass);
    setUname("");
    setPass("");
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        style={{ width: 150, height: 150, marginBottom: 30 }}
        source={require("../assets/logo.png")}
      />
      <View style={styles.upper}>
        <TextInput
          value={uname}
          placeholder="User Name"
          onChange={(text) => setUname(text.nativeEvent.text)}
          style={{
            ...styles.input,
            borderColor:
              invalids === INVALIDS.BOTH || invalids === INVALIDS.UNAME
                ? "#f00"
                : "transparent",
          }}
        />
        <TextInput
          value={pass}
          placeholder="Password"
          onChange={(text) => setPass(text.nativeEvent.text)}
          secureTextEntry
          style={{
            ...styles.input,
            borderColor:
              invalids === INVALIDS.BOTH || invalids === INVALIDS.PASS
                ? "#f00"
                : "transparent",
          }}
        />
      </View>
      <View style={styles.lower}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin.bind(this, "login")}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.second]}
          onPress={handleLogin.bind(this, "register")}
        >
          <Text style={styles.text}>Regiser</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  upper: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#eee",
    width: "60%",
    borderWidth: 1,
    borderColor: "transparent",
  },
  lower: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  button: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#c60",
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
  },
  second: {
    backgroundColor: "#eee",
    borderColor: "#c60",
    borderWidth: 2,
  },
});
