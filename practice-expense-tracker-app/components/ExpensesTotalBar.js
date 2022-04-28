import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../colors/colors";
import {formatCurrency} from "../utils/helperFunctions"

function ExpensesTotalBar({periodText, expensesData}) {

  const totalSum = expensesData.reduce((total, item) => {
    return total = total + item.amount
  }, 0)

  const formatedTotal = formatCurrency(totalSum)

  return (
    <View style={styles.totalBarContainer}>
      <Text style = {styles.periodText}>{periodText}</Text>
      <Text style = {styles.totalAmountText}> {formatedTotal}</Text>
    </View>
  );
}

export default ExpensesTotalBar;

const styles = StyleSheet.create({
  totalBarContainer: {
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    borderRadius: 6,
    elevation: 8,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 15
  },

  periodText: {
    color: GlobalStyles.colors.primary400,
    fontSize: 15
  },

  totalAmountText: {
    color: GlobalStyles.colors.primary400,
    fontSize: 17,
    fontWeight: "bold"
  }
});
