import { Text, StyleSheet, Platform } from "react-native";
//Platform will target a specific platform only
//Or you can create 2 different files with ... Title.android.js : Title.ios.js
//And configure then in the way you want for the respective devices
//When importing the component don't include the "android" or "ios"

function Title(props) {
  return <Text style={styles.title}>{props.children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    //fontWeight: "bold",
    color: "white",
    textAlign: "center",
    //borderWidth: Platform.OS === "android" ? 2 : 0 ,
    borderWidth: Platform.select({ios: 1, android: 2}),
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300
  },
});
