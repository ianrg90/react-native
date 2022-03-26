import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

//android_ripple just work for android as the name suggests 
//for IOS use the style function method pressedData.pressed

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#dddddd" }}
        onPress={props.onDeleteGoal.bind(this, props.id)}
        style = {(pressedData) => pressedData.pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    backgroundColor: "#5e0acc",
  },

  pressedItem: {
    opacity: 0.5
  },

  goalText: {
    color: "#ffffff",
    padding: 20,
  },
});

export default GoalItem;
