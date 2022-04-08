import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/Colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen(props) {
  const [userInput, setUserInput] = useState("");
  const { width, height } = useWindowDimensions();

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

  const marginTopDistance = height > width ? 100 : 60;

  //KeyBoardAvoidingView fix the keyboard in portrait mode in this case
  //However it needs a scroolview so it can move the content

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
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
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

//This will not work because when the orientation changes this code is not re-rendered
//Need to use useWindowDimensions hook
//const deviceHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 420 ? 40 : 100,
    alignItems: "center",
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
