import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.pressed : null)}
      onPress={onPress}
    >
      <View style={styles.iconButtonContainer}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconButtonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8
  },
  
  pressed: {
    opacity: 0.6,
  },
});
