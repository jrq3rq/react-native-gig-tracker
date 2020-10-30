import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import Todo from "./Todo";
import { LineChart, BarChart } from "react-native-chart-kit";

const App = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [label, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  const [gigs, setGigs] = useState([
    {
      description: "Freelance full build",
      amount: 999.99,
      timestamp: new Date(),
    },
    {
      description: "Freelance partial build",
      amount: 350.99,
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
        timestamp: new Date(),
      },
    ]);

    setDescription("");
    setAmount("");
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>React Native Gig Tracker</Text>
      </View>
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
            datasets: [
              {
                data: [gigs[0].amount, gigs[1].amount],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#40C8F5",
            backgroundGradientTo: "#1170C2",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "green",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <Text>Total Inome: ${total}</Text>
      <TextInput
        style={styles.input}
        value={description}
        placeholder="enter a description"
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        value={amount}
        placeholder="Enter the amount you made in USD ($)"
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      ></TextInput>
      <Button
        disabled={!amount && !description}
        onPress={addGig}
        title="Add Gig"
      />

      {gigs.map((gig) => (
        <View>
          <Text>{gig.description}</Text>
          <Text>{gig.amount}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    margin: 20,
    padding: 20,
    height: 40,
    borderColor: "green",
    borderWidth: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
