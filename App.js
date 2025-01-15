import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const EyeCareApp = () => {
  const [timer, setTimer] = useState(0); // Timer state
  const [isRunning, setIsRunning] = useState(false); // State to track if the timer is running

  useEffect(() => {
    let interval = null;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000); // Decrease the timer by 1 every second
    } else if (timer === 0 && isRunning) {
      // When timer reaches 0
      clearInterval(interval);
      alert("Time's up! Look 20 feet away for 20 seconds."); // Reminder alert
      setIsRunning(false);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or timer stop
  }, [timer, isRunning]);

  const startTimer = () => {
    setTimer(20); // Set timer to 20 seconds
    setIsRunning(true); // Start the timer
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>20-20 Eye Care Reminder</Text>

      {isRunning ? (
        <Text style={styles.timer}>Time Remaining: {timer} seconds</Text>
      ) : (
        <Text style={styles.instructions}>
          Press "Start Reminder" to begin a 20-second timer.
        </Text>
      )}

      <Button title="Start Reminder" onPress={startTimer} disabled={isRunning} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    fontSize: 20,
    color: "red",
    marginVertical: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default EyeCareApp;
