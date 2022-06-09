import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import OutLinedButton from "../components/UI/OutlinedButton";
import { fetchPlaceDetails } from "../utils/database";
import { Colors } from "../styles/colors";

const FavoriteDetails = ({ route, navigation }) => {
  const [placeDetails, setPlaceDetails] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      lat: placeDetails.lat,
      long: placeDetails.long,
    });
  }

  const placeId = route.params.id;

  useEffect(() => {
    async function getDetailsFromDB() {
      const place = await fetchPlaceDetails(placeId);
      navigation.setOptions({ title: place.title });
      setPlaceDetails(place);
    }
    getDetailsFromDB();
  }, [placeId]);

  if (!placeDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary500} />
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeDetails.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutLinedButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutLinedButton>
      </View>
    </ScrollView>
  );
};

export default FavoriteDetails;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "35%",
    minHeight: 300,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  locationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
