import { View, Text, StyleSheet } from "react-native";

function List({ data }) {
  return data.map((item) => {
    return (
      <View key={item} style = {styles.listItem}>
        <Text style = {styles.itemText} >{item}</Text>
      </View>
    );
  });
}

export default List;

const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 2,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#e2b497"
    },
    itemText: {
        fontFamily: "open-sans",
        color: "#351401",
        textAlign: "center"
    }
})