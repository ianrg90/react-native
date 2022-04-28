import {View, StyleSheet, Text} from "react-native"
import {GlobalStyles} from "../../colors/colors"

function NoExpenses({children}) {
  return (
    <View style = {styles.container}>
        <Text style = {styles.text}>
           {children}
        </Text>
    </View>
  )
}

export default NoExpenses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10
    },

    text: {
        color: GlobalStyles.colors.primary50,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    }
})