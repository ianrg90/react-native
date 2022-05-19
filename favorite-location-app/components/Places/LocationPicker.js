import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../styles/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview, getAddress } from "../../utils/location";

function LocationPicker({ onLocationSet }) {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermissionInfo, requestPermissions] =
    useForegroundPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  //The stack navigator does not run useEffect again because the page is just pushed in front of the stack
  //Therefore use this hook to check if the screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    //If the user comes back from the map screen with a picked location
    if (isFocused && route.params) {
      const customPickedLocation = {
        lat: route.params.pickedLat,
        long: route.params.pickedLong,
      };

      setPickedLocation(customPickedLocation);
    }
  }, [isFocused, route]);

  useEffect(() => {
    async function tranlateToAddress() {
      if (pickedLocation) {
        const toAddress = await getAddress(
          pickedLocation.lat,
          pickedLocation.long
        );
        onLocationSet({...pickedLocation, address: toAddress});
      }
    }

    tranlateToAddress();
  }, [pickedLocation, onLocationSet]);

  async function verifyLocPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermissions();

      return response.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission denied",
        "You need to grant the app location permission to use this feature"
      );
      return false;
    }

    return true;
  }

  async function locationHandler() {
    setIsLoading(true);
    const hasPermission = await verifyLocPermissions();

    if (!hasPermission) {
      setIsLoading(false);
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
    setIsLoading(false);
  }

  function pickLocationHandler() {
    navigation.navigate("Map");
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation && !isLoading && (
          <Image
            style={styles.mapImage}
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.long),
            }}
          />
        )}
        {!pickedLocation && !isLoading && <Text>Pick a location</Text>}
        {isLoading && <ActivityIndicator size="large" />}
      </View>
      <View style={styles.buttons}>
        <OutlinedButton icon="location" onPress={locationHandler}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickLocationHandler}>
          Pick a location
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 6,
  },

  mapImage: {
    width: "100%",
    height: "100%",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
