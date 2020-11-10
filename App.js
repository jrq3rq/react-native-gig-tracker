import React from "react";
import { SafeAreaView } from "react-native";
import Homepage from "./Homepage.js";
import LoginPage from "./LoginPage.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            title: "Sign in or Sing Up",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
