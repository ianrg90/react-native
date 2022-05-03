import {View, StyleSheet, Text} from "react-native"
import {GlobalStyles} from "../../colors/colors"
import Button from "./Button"

function LoadingOverlay({message, onConfirm}) {
  return(
      <View style = {styles.container}>
          <Text style = {[styles.title, styles.text]}>An error ocurred!</Text>
          <Text style = {styles.text}>{message}</Text>
          <Button onPress={onConfirm}>Okay</Button>
      </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    text: {
        color: "white",
        marginBottom: 15,
        textAlign: "center"
    }
})