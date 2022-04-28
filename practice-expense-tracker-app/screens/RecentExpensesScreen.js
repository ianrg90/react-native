import ExpensesOutput from "../components/ExpensesOutput";

function RecentExpensesScreen() {
  return <ExpensesOutput periodText="Last seven days" periodToFilter = {7} />;
}

export default RecentExpensesScreen;
