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
import * as moment from "moment";

const App = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    { date: moment().format("dd"), amount: 2000 },
    { date: moment().subtract(1, "days").format("dd"), amount: 2500 },
    { date: moment().subtract(1, "days").format("dd"), amount: 3500 },
    { date: moment().subtract(1, "days").format("dd"), amount: 4500 },
    { date: moment().subtract(2, "days").format("dd"), amount: 8500 },
    { date: moment().subtract(3, "days").format("dd"), amount: 3500 },
    { date: moment().subtract(5, "days").format("dd"), amount: 2500 },
    { date: moment().subtract(5, "days").format("dd"), amount: 1500 },
  ]);

  // const [transformedData, setTransformedData] = useEffect([]);

  // useEffect(() => {
  //   setTransformedData(transformedData(groupBy(data, "data")));
  // }, [data]);

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const [gigs, setGigs] = useState([
    {
      description: "Freelance full build",
      amount: 499.99,
      timestamp: new Date(),
    },
  ]);

  const getDates = () => data.map((pair) => pair.date);
  const getAmounts = () => data.map((pair) => pair.amount);
  const transformData = (groupedData) => {
    const transformedArray = [];

    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0);
      transformedArray.push({
        date: moment(entry[0]).format("dd"),
        amount: total,
      });
    });

    const sortedArray = transformedArray.sort((a, b) =>
      moment(a["date"]).diff(moment(a["date"]))
    );

    return sortedArray;
  };

  //   DEBUG (6) [{…}, {…}, {…}, {…}, {…}, {…}]
  //   App.js:57 the dates!!! (6) ["November 6, 2020", "November 5, 2020", "November 5, 2020", "November 5, 2020", "November 4, 2020", "November 4, 2020"]
  // App.js:58 the amounts!!! (6) [200, 2500, 3500, 4500, 5500, 5500]
  // App.js:59 the grouped values are.... (3) [Array(2), Array(2), Array(2)]
  // App.js:63 the TOTAL grouped values (3) [{…}, {…}, {…}]
  // App.js:56 DEBUG (6) [{…}, {…}, {…}, {…}, {…}, {…}]
  // App.js:57 the dates!!! (6) ["November 6, 2020", "November 5, 2020", "November 5, 2020", "November 5, 2020", "November 4, 2020", "November 4, 2020"]
  // App.js:58 the amounts!!! (6) [200, 2500, 3500, 4500, 5500, 5500]
  // App.js:59 the grouped values are.... (3) [Array(2), Array(2), Array(2)]
  // App.js:63 the TOTAL grouped values (3) [{…}, {…}, {…}]

  console.log("DEBUG", data);
  console.log("the dates!!!", getDates());
  console.log("the amounts!!!", getAmounts());
  console.log(
    "the grouped values are....",
    Object.entries(groupBy(data, "date"))
  );
  console.log("the TOTAL grouped values", transformData(groupBy(data, "date")));

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
            labels: getDates(),
            datasets: [
              {
                data: getAmounts(),
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#40C8F5",
            backgroundGradientTo: "#1170C2",
            decimalPlaces: null, // optional, defaults to 2dp
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
