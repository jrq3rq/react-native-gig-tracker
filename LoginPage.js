import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 40,
    borderColor: "Black",
    borderWidth: 1,
  },
});
const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username === "test" && password === "admin") {
      navigation.navigate("Home");
    }
  };

  return (
    <View>
      <Text>I am the Login page</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Enter your username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry={true}
        type="password"
        placeholder="Enter your pssword"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default LoginPage;
