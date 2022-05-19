import { View, Text, StyleSheet, FlatList } from "react-native";
import { Colors } from "../../styles/colors";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  if (places && places.length > 0) {
    return (
      <FlatList
        data={places}
        key={(item) => item.id}
        renderItem={({item}) => <PlaceItem place={item} />}
        style = {styles.listContainer}
      />
    );
  }

  return (
    <View style={styles.fallBackContainer}>
      <Text style={styles.fallBackText}>You have no favorites place yet</Text>
    </View>
  );
}

export default PlacesList;

const styles = StyleSheet.create({

  listContainer: {
    margin: 24
  },

  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fallBackText: {
    color: Colors.primary50,
    fontSize: 20,
    fontWeight: "bold",
  },
});
