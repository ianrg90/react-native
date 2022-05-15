import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../../styles/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function onTextChangeHandler(enteredText) {
    setEnteredTitle(enteredText);
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
      <ImagePicker />
      <LocationPicker />
      <Button>Add Place</Button>
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
