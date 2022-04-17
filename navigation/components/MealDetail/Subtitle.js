import {Text, StyleSheet} from "react-native"

function Subtitle({children}) {
  return (
    <Text style={styles.subtitleText}>{children}</Text>
  )
}
export default Subtitle

const styles = StyleSheet.create({
    subtitleText: {
        fontFamily: "open-sans",
        fontWeight: "bold",
        textAlign: "center",
        color: "#e2b497",
        fontSize: 18,
        margin: 8,
        padding: 6,
        borderBottomColor: "#e2b497",
        borderBottomWidth: 2,
        marginHorizontal: 12
      },
})