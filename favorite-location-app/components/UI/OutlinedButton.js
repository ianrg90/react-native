import { View, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Colors} from "../../styles/colors"

function OutlinedButton({ icon, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={icon} color={Colors.primary500} size={22} />
      <Text style = {styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderColor: Colors.primary500
  },

  pressed: {
    opacity: 0.35,
  },

  text: {
    color: Colors.primary500,
    fontSize: 18,
    marginLeft: 10
    
  }
});
