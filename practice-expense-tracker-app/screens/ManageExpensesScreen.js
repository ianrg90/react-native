import { useLayoutEffect, useContext, useState } from "react";
import { ExpensesContext } from "../store/expenses-contex";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../colors/colors";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpenseData, deleteExpenseData } from "../http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpensesScreen({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editingId = route.params?.expenseId;
  //Convert falsy and truthy
  const isUserEditing = !!editingId;

  const currentExpense = expensesCtx.expensesList.find(
    (expense) => expense.id === editingId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isUserEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isUserEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteHandler() {
    setIsLoading(true)
    try {
      await deleteExpenseData(editingId);
      expensesCtx.deleteExpense(editingId);
      navigation.goBack();
    } catch (err) {
      setError("Failed to delete expense");
    }
    setIsLoading(false)
  }

  async function confirmHandler(expensesData) {
    setIsLoading(true);
    if (isUserEditing) {
      try {
        await updateExpenseData(editingId, expensesData);
        expensesCtx.updateExpense(editingId, expensesData);
        navigation.goBack();
      } catch (err) {
        setError("Failed to update your expense");
      }
      setIsLoading(false);
    } else {
      try {
        const id = await storeExpense(expensesData);
        expensesCtx.addExpense({ ...expensesData, id: id });
        navigation.goBack();
      } catch (err) {
        setError("Failed to add expense");
      }

      setIsLoading(false);
    }
  }

  function closeErrorModal() {
    setError(null);
    navigation.goBack();
  }

  return (
    <>
      {isLoading && !error && <LoadingOverlay />}
      {!isLoading && error && (
        <ErrorOverlay message={error} onConfirm={closeErrorModal} />
      )}
      {!isLoading && !error && (
        <View style={styles.screenContainer}>
          <ExpenseForm
            onCancel={cancelHandler}
            isUserEditing={isUserEditing ? "Update" : "Add"}
            onSubmit={confirmHandler}
            defaultValues={currentExpense}
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
      )}
    </>
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
