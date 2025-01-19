import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import {Audio} from "expo-av";

const EyeCareApp = () => {
  const [intervalMinutes, setIntervalMinutes ] = useState(20);
  const [timer, setTimer] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const [sound, setSound] = useState(null);
  
  

  useEffect(() => {
    let interval = null;

    if (isRunning){
      setTimer(intervalMinutes * 60);
      interval = setInterval(() => {
        setTimer((prev) => {
          if(prev <=1){
            sendReminder();
            return intervalMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, intervalMinutes]);

  const sendReminder = async () => {
    Alert.alert(
      "20-20 Eye Care Reminder ",
      `Take a break! Look at something 20 feet away for 20 seconds.`
    );

    playSound();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "20-20 Eye Care Reminder ",
        body:  "Take a break! Look at something 20 feet away for 20 seconds.",
        sound: true,
      }, 
      trigger: null,
    });



  };

  const playSound = async () => {
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/notification.m4a")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const stopReminder = () => {
    if(intervalMinutes < 1){
      Alert.alert(
        "Invalid Time",
        "Please set a valid time interval (minimum 1 minute)."
      );
    };

    const startReminder = () => {
      if(intervalMinutes < 1){
        Alert.alert(
        "Invalid Time",
        "Please set a valid time interval (minimum 1 minute)."
        );
        return;
      }

      setIsRunning(true);
      Alert.alert(
       "Reminder Started",
      `You will receive reminders every ${intervalMinutes} minutes.`
    );
    };
    return (
      <View style={StyleSheet.container}>
          <Text style={styles.title}>20-20 Eye Care Reminder</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Set Reminder interval (minutes):</Text>
            <TextInput 
            style={styles.input}
            keyboardType="numeric"
            value={intervalMinutes.toString()}
            onChangeText={(value) => setIntervalMinutes(Number(value))}
            />
          </View>

          {isRunning ? (
            <Text style={styles.timer}>
              Next reminder in: {Math.floor(timer / 60)} min {timer % 60} sec
            </Text>
          ): (
            <Text style={styles.instructions}>
              Press "Start Reminder" to begin receiving reminders.
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
            title="Start Reminder"
            onPress={startReminder}
            disabled={isRunning}
            />
            <Button 
            title="Stop Reminder"
            onPress={stopReminder}
            disabled={!isRunning}
            />

          </View>


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
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    inputContainer: {
      marginVertical: 20,
      width: "80%",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
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
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
    },

  });

}

export default EyeCareApp;

  