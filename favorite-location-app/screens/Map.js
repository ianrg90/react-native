import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useLayoutEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";

function Favorites() {
  const [selectedLocation, setSelectedLocation] = useState();
  const navigation = useNavigation();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, long: long });
  }

  const saveLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location selected", "You need to pick a location first");
      return;
    }
    navigation.navigate("AddFavorite", {
      pickedLat: selectedLocation.lat,
      pickedLong: selectedLocation.long,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ headerTintColor }) => (
        <IconButton
          icon="save"
          color={headerTintColor}
          size={28}
          onPress={saveLocation}
        />
      ),
    });
  }, [navigation, saveLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.mapContainer}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        />
      )}
    </MapView>
  );
}

export default Favorites;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
