import { View, Text, StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Colors from "../../constants/Colors";

function GuessItem({number, roundIndex}) {
  return (
    <View style={styles.guessItem}>
      <Text style = {styles.textStyle}>#{roundIndex}</Text>
      <Text style = {styles.textStyle}>Opponent's guess: {number}</Text>
    </View>
  );
}

export default GuessItem;

const styles = StyleSheet.create({
  guessItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    padding: 13,
    marginVertical: 10,
    borderRadius: 40,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4
  },

  textStyle:{
    fontFamily: "open-sans"
  }
  
});
