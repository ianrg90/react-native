import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

function Button({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary800,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 10,
    marginTop: 25,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },

  pressed: {
    opacity: 0.5,
  },

  text: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.primary50,
  },
});
