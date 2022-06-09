import { View, Text, StyleSheet, FlatList } from "react-native";
import { Colors } from "../../styles/colors";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation = useNavigation();

  if (places && places.length > 0) {
    return (
      <FlatList
        data={places}
        key={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceItem
            place={item}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          />
        )}
        style={styles.listContainer}
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
    margin: 24,
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
