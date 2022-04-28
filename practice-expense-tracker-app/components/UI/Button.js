import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../colors/colors";

function Button({ children, onPress, mode, style }) {
  return (
    <View style = {style}>
      <Pressable style = {({pressed}) => pressed ? styles.pressed : null} onPress = {onPress}>
        <View style = {[styles.button, mode === "flat" ? styles.flat : null]}>
          <Text style = {[styles.text, mode === "flat" ? styles.flatText : null]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6
    },

    flat: {
        backgroundColor: "transparent"
    },

    text:{
        color: "white",
        textAlign: "center"
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    },

    pressed: {
        opacity: 0.70,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 6
    }
});
