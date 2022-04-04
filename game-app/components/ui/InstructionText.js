import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

//the styles on the right of the array will overide the previous ones
//cascade effect in some manner

function InstructionText({children, style}) {
  return <Text style={[styles.inputText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  inputText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 20,
  },
});
