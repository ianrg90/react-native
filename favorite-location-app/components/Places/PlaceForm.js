import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { Colors } from "../../styles/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import {Place} from "../../models/place"

function PlaceForm({onCreateHandler}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [imageData, setImageData] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function onTextChangeHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function getImageData(imageUri) {
    setImageData(imageUri);
  }

  const getLocationData = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function saveForm() {
    
   
    const placeData = new Place(enteredTitle, imageData, pickedLocation )
    onCreateHandler(placeData)
  }


  return (
    <ScrollView style={styles.form}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={onTextChangeHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImageTaken={getImageData} />
      <LocationPicker onLocationSet={getLocationData} />
      <Button onPress={saveForm}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },

  label: {
    color: Colors.primary500,
    fontSize: 18,
    marginBottom: 8,
  },

  input: {
    backgroundColor: Colors.primary100,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary100,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
});
