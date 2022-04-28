import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm({ onCancel, onSubmit, isUserEditing, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(identifier, enteredValue) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [identifier]: {value: enteredValue, isValid: true},
        //This sintax is standard javascript to change properties dinamically
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount >= 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description !== "";

    if (!isAmountValid || !isDescriptionValid || !isDateValid) {
      //Alert.alert("Invalid input", "Please check your input values");
      setInputs(currentInput => {
        return {
          amount: {value: currentInput.amount.value, isValid: isAmountValid},
          date: {value: currentInput.date.value, isValid: isDateValid},
          description: {value: currentInput.description.value, isValid: isDescriptionValid},
        }
      })

      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputRows}>
        <Input
          style={styles.rowInput}
          label="Amount"
          isValid={inputs.amount.isValid}
          textIputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          isValid={inputs.date.isValid}
          textIputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLenght: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
       isValid={inputs.description.isValid}
        textIputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "sentences", //default is true
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonStyle} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={submitHandler}>
          {isUserEditing}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 10,
  },
});
