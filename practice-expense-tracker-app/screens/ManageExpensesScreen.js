import { useLayoutEffect, useContext } from "react";
import { ExpensesContext } from "../store/expenses-contex";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../colors/colors";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpensesScreen({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const editingId = route.params?.expenseId;
  //Convert falsy and truthy
  const isUserEditing = !!editingId;

  const currentExpense = expensesCtx.expensesList.find(expense => expense.id === editingId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isUserEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isUserEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  function deleteHandler() {
    expensesCtx.deleteExpense(editingId);
    navigation.goBack();
  }

  function confirmHandler(expensesData) {
    if (isUserEditing) {
      expensesCtx.updateExpense(editingId, expensesData)
    } else {
      expensesCtx.addExpense(expensesData)
    }
    navigation.goBack();
  }

  return (
    <View style={styles.screenContainer}>
      <ExpenseForm
        onCancel={cancelHandler}
        isUserEditing={isUserEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues = {currentExpense}
      />
      {isUserEditing && (
        <>
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={40}
              onPress={deleteHandler}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default ManageExpensesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 20,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
