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
      require("./assets/notification.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }



  