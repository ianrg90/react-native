import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expensesList: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      const inverse = action.payload.reverse()
      return inverse

    case "ADD":
      return [ action.payload , ...state];
    case "UPDATE":
      const findExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const expenseToUpdate = state[findExpenseIndex];
      const updatedItem = { ...expenseToUpdate, ...action.payload.data };
      const updatedExpenseList = [...state];
      updatedExpenseList[findExpenseIndex] = updatedItem;

      return updatedExpenseList;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expensesList){
    dispatch({type: "SET", payload: expensesList})
  }

  function addExpense(expensesData) {
    dispatch({ type: "ADD", payload: expensesData });
  }

  function updateExpense(id, expensesData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expensesData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const expensesContext = {
    expensesList: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={expensesContext}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
