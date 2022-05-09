import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../../styles/colors";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function onTextChangeHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  console.log(enteredTitle)

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
