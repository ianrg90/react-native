import { View, StyleSheet , Dimensions ,useWindowDimensions} from "react-native";
import Colors from "../../constants/Colors";

function Card(props) {
  const {width, height} = useWindowDimensions()

  const marginHorizontalDistance = height > width ? 24 : 200

  return <View style = {[styles.inputContainer, {marginHorizontal: marginHorizontalDistance}]}>{props.children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginHorizontal: 24,
    marginTop: deviceWidth < 380 ? 18 : 36,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 8,
    //For IOS only the three below
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    alignItems: "center",
  },
});
