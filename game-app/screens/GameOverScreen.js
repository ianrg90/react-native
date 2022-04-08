import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ userNumber, onRestart, numberOfRounds }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;
  let marginTopDistance = 100

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 420) {
    imageSize = 80;
    marginTopDistance = 20
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style = {[styles.screen, {marginTop: marginTopDistance}]}>
      <View style={styles.screenContainer}>
        <Title>Game Over</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.highlightText}>{numberOfRounds}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlightText}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

//const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },  
  screenContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    //  borderRadius: deviceWidth < 380 ? 100 : 150,
    //  width: deviceWidth < 380 ? 200 : 300,
    //  height: deviceWidth < 380 ? 200 : 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 25,
  },

  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
