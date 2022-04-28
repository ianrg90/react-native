import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-contex";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../colors/colors";
import ExpensesTotalBar from "./ExpensesTotalBar";
import ExpensesList from "./ExpensesList";
import { getDateMinusDays } from "../utils/helperFunctions";
import NoExpenses from "./UI/NoExpenses";

function ExpensesOutput({ periodText, periodToFilter }) {
  const expensesCtx = useContext(ExpensesContext);

  let data = expensesCtx.expensesList;

  if (periodToFilter) {
    data = data.filter((expense) => {
      const today = new Date();
      const sevenDaysAgo = getDateMinusDays(today, periodToFilter);

      return expense.date > sevenDaysAgo;
    });
  }

  return (
    <View style={styles.container}>
      {data.length === 0 && periodToFilter && <NoExpenses>You have no expenses in the last {periodToFilter} days</NoExpenses>}
      {data.length === 0 && !periodToFilter && <NoExpenses>You have no expenses at all</NoExpenses>}
      {data.length !== 0 && (
        <>
          <ExpensesTotalBar periodText={periodText} expensesData={data} />
          <ExpensesList expensesData={data} />
        </>
      )}
    </View>
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
