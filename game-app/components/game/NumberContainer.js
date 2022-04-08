import {View, Text, StyleSheet, Dimensions} from "react-native"
import Colors from "../../constants/Colors"

function NumberContainer(props) {
  return (
    <View style = {styles.container}>
        <Text style = {styles.numberText}>{props.children}</Text>
    </View>
  )
}

export default NumberContainer
//In IOS window and screen are the same 
//In Android screen includes the status bar and window excludes the status bar
const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },

    numberText: {
      fontFamily: "open-sans-bold",
        color: Colors.accent500,
        //fontWeight: "bold",
        fontSize: deviceWidth < 380 ? 28 : 36,
    }
})