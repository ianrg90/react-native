import React from "react";
import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";

function GoalInput(props) {
  const [input, setInput] = useState("");

  const getUserInput = (enteredText) => {
    setInput(enteredText);
  };

  const addUserInput = () => {
    if (input === "") return;

    props.onAddGoal(input);
    setInput("");
  };

  return (
    <Modal visible={props.showModal} animationType="fade">
      <View style={styles.inputContainer}>
        <Image style = {styles.image} source={require("../assets/images/goal.png")}/>
        <TextInput
          value={input}
          placeholder="Your course goal!"
          style={styles.textInput}
          onChangeText={getUserInput}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add goal" onPress={addUserInput} color = "#5e0acc" />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCloseModal} color = "#f31282" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#311b6b"
  },
  image: {
    width: 150,
    height: 150,
    margin: 20

  },
  textInput: {
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    borderWidth: 1,
    width: "100%",
    marginRight: 8,
    padding: 16,
  
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },

  button: {
    width: 100,
    marginHorizontal: 8
  },

  
});

export default GoalInput;
