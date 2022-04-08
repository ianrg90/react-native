import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessItem from "../components/game/GuessItem";

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

function GameScreen({ userNumber, onGameOver, onHandleRounds }) {
  const initalGuess = generateRandNumbBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [guessRound, setGuessRound] = useState([initalGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onHandleRounds();
      onGameOver();
      minBoundary = 1;
      maxBoundary = 100;
    }
  }, [currentGuess, userNumber, onGameOver, onHandleRounds]);

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

    onHandleRounds();

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
    setGuessRound((prevGuess) => [...prevGuess, newRndNumber]);
  };

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionsText}>
          Higher or lower ?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "smaller")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "bigger")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  const marginTopDistance = height > width ? 100 : 40

  if (width > height) {
    content = (
      <>
        <View style = {styles.landscapeView}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "smaller")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "bigger")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={[styles.screen, {marginTop: marginTopDistance}]}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.guessContainer}>
        <FlatList
          data={guessRound}
          renderItem={(itemData) => {
            return (
              <GuessItem number={itemData.item} roundIndex={itemData.index} />
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    //marginTop: 100,
    alignItems: "center",
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

  guessContainer: {
    flex: 1,
    padding: 20,
  },
  landscapeView: {
    flexDirection: "row",
    alignItems: "center",
  }
});
