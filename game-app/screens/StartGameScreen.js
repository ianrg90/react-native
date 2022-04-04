import { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/Colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"

function StartGameScreen(props) {
  const [userInput, setUserInput] = useState("");

  function getUserInput(enteredInput) {
    setUserInput(enteredInput);
  }

  function confirmInputHandler() {
    const chosenNum = parseInt(userInput);

    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99", [
        { text: "Got it!", style: "destructive", onPress: resetInput },
      ]);

      return;
    }
    props.onUserNumberHandler(chosenNum);
  }

  function resetInput() {
    setUserInput("");
  }

  return (
    <View style = {styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number!</InstructionText>
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={getUserInput}
          value={userInput}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInput}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center"
  },
 
  input: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  buttonContainer: {
    flex: 1,
  },
});
