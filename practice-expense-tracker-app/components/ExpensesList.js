import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../colors/colors";
import { formatCurrency, formatDate } from "../utils/helperFunctions";
import {useNavigation} from "@react-navigation/native"

function ExpensesList({ expensesData }) {
  const navigation = useNavigation()

  function navigateToManageScreen(id){
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    })
    
  }

  function renderListItem(itemData) {
    const expense = itemData.item;
    const formatedDate = formatDate(expense.date);
    const formatedAmout = formatCurrency(expense.amount);

    return (
      <Pressable style = {({pressed}) => pressed ? styles.pressed : null} onPress = {navigateToManageScreen.bind(this, expense.id)}>
        <View style={styles.listItem}>
          <View>
            <Text style={[styles.baseText, styles.description]}>
              {expense.description}
            </Text>
            <Text style={styles.baseText}>{formatedDate}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{formatedAmout}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={expensesData}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
      />
    </View>
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    marginBottom: 30,
  },

  pressed: {
    opacity: 0.70
  },

  listItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
  },
  baseText: {
    color: GlobalStyles.colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },

  priceContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 95,
  },

  priceText: {
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold",
  },
});
