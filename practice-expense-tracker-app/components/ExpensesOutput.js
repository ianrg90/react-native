import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-contex";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../colors/colors";
import ExpensesTotalBar from "./ExpensesTotalBar";
import ExpensesList from "./ExpensesList";
import { getDateMinusDays } from "../utils/helperFunctions";
import NoExpenses from "./UI/NoExpenses";
import { fetchExpenses } from "../http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay"

function ExpensesOutput({ periodText, periodToFilter }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);

  async function getExpenses() {
    setIsLoading(true);
    try {
      const response = await fetchExpenses();
      expensesCtx.setExpenses(response);
    } catch (err) {
      setError("Error loading your expenses")
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getExpenses();
  }, []);

  function closeErrorModal(){
    setError(null)
    getExpenses()
  }

  let dataToRender = expensesCtx.expensesList;

  if (periodToFilter) {
    dataToRender = dataToRender.filter((expense) => {
      const today = new Date();
      const sevenDaysAgo = getDateMinusDays(today, periodToFilter);

      return expense.date > sevenDaysAgo ? true : false;
    });
  }

  return (
    <>
      {isLoading && !error && <LoadingOverlay />}
      {!isLoading && error && <ErrorOverlay message={error} onConfirm = {closeErrorModal}/>}
      {!isLoading && !error && (
        <View style={styles.container}>
          {dataToRender.length === 0 && periodToFilter && (
            <NoExpenses>
              You have no expenses in the last {periodToFilter} days
            </NoExpenses>
          )}
          {dataToRender.length === 0 && !periodToFilter && (
            <NoExpenses>You have no expenses at all</NoExpenses>
          )}
          {dataToRender.length !== 0 && (
            <>
              <ExpensesTotalBar
                periodText={periodText}
                expensesData={dataToRender}
              />
              <ExpensesList expensesData={dataToRender} />
            </>
          )}
        </View>
      )}
    </>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 25,
  },
});
