import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function Card(props) {
  return <View style = {styles.inputContainer}>{props.children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginHorizontal: 24,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 8,
    //For IOS only the three below
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    alignItems: "center",
  },
});
