import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
//import {useNavigation} from "@react-navigation/native"

function CategoryGridTile({ title, color, onPress }) {

  //Works the same as the react router useNavigate
  //Through this you can access the naviation object in components that are not defined as screens
  
  //const navigation = useNavigation()

  return (
    <View style={styles.gridItem}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonStyle,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#cccccc" }}
        onPress = {onPress}
      >
        <View style={[styles.innerContainer, {backgroundColor: color}]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    //For ios shadow
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  buttonStyle: {
    flex: 1,
  },
  //To add similar adroid_ripple effect on IOS
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    fontFamily: "open-sans",
    fontWeight: "bold",
    fontSize: 18,
  },
});
