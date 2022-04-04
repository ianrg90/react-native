import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameOver] = useState(true)

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")

  })

  if(!fontsLoaded){
    return <AppLoading/>
  }

  function userNumberHandler(number) {
    setUserNumber(number);
    setGameOver(false)
  }

  function gameOverHandler(){
    setGameOver(true)
  }

  let screen = <StartGameScreen  onUserNumberHandler={userNumberHandler}/>

  if(userNumber){
    screen = <GameScreen userNumber = {userNumber} onGameOver = {gameOverHandler}/>
  }

  if(gameOver && userNumber){
    screen = <GameOverScreen/>
  }  

  return (
    <LinearGradient colors={[ Colors.primary700, Colors.accent500 ]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style = {styles.rootScreen}>
         {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.25,
  },
});
