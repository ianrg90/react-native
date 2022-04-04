import { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";

const generateRandNumbBetween = (min, max, exclude) => {
  const rdNumb = Math.floor(Math.random() * (max - min)) + min;

  if (rdNumb === exclude) {
    return generateRandNumbBetween(min, max, exclude);
  } else {
    return rdNumb;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initalGuess = generateRandNumbBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "smaller" && currentGuess < userNumber) ||
      (direction === "bigger" && currentGuess > userNumber)
    ) {
      Alert.alert(
        "Shame on you",
        "You know that lying is wrong. Please tell your phone the truth",
        [{ text: "Sorry!", style: "cancel" }]
      );
      return;
    }

    if (currentGuess === userNumber) {
      console.log("You won");
      return;
    }

    if (direction === "smaller") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandNumbBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionsText}>
          Higher or lower ?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "smaller")}>
              <Ionicons name= "md-remove" size={24} color= "white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "bigger")}>
            <Ionicons name= "md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View>{/*Log rounds*/}</View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 100,
  },
  //This will add styles to the components via props
  instructionsText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },
});
