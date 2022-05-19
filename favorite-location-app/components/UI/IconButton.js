import {View, Pressable, StyleSheet} from "react-native"
import { Ionicons } from "@expo/vector-icons";


function IconButton({icon, color, size, onPress}) {
  return (
    <Pressable onPress={onPress} style = {({pressed}) => pressed ? styles.pressed : null}>
      <View style = {styles.buttonContainer}>
        <Ionicons name={icon} color={color} size = {size}/>
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 5,
  },

  pressed: {
    opacity: 0.35
  }
})