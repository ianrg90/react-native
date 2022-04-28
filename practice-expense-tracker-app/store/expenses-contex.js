import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expensesList: [],
  addExpense: ({description, amount, date}) => {},
  updateExpense: (id, {description, amount, date}) => {},
  deleteExpense: (id) => {},
});

const DUMMY_DATA = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 49.99,
    date: new Date("2022-02-10"),
  },
  {
    id: "e2",
    description: "A book",
    amount: 30.935,
    date: new Date("2022-01-10"),
  },
  {
    id: "e3",
    description: "A game",
    amount: 100,
    date: new Date("2022-03-06"),
  },
  {
    id: "e4",
    description: "A notebook",
    amount: 1500.34,
    date: new Date("2022-04-21"),
  },
  {
    id: "e5",
    description: "A hat",
    amount: 5.87,
    date: new Date("2022-04-19"),
  },
  {
    id: "e6",
    description: "A pizza",
    amount: 10.23,
    date: new Date("2022-04-20"),
  },
  {
    id: "e7",
    description: "A house",
    amount: 55000,
    date: new Date("2022-02-04"),
  },
];

function expensesReducer(state, action){
    switch(action.type){
        case("ADD"):
            const id = new Date().toString() + Math.random().toString()

            return [ {...action.payload, id: id}, ...state ]
        case("UPDATE"):
            const findExpenseIndex = state.findIndex(expense => expense.id === action.payload.id)
            const expenseToUpdate = state[findExpenseIndex]
            const updatedItem = {...expenseToUpdate, ...action.payload.data}
            const updatedExpenseList = [...state]
            updatedExpenseList[findExpenseIndex] = updatedItem

            return updatedExpenseList

        case("DELETE"):
            return state.filter(expense => expense.id !== action.payload)
        default:
            return state
    }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_DATA);

  function addExpense(expensesData){
    dispatch({type: "ADD", payload: expensesData})
  }

  function updateExpense(id, expensesData){
    dispatch({type: "UPDATE", payload: {id: id, data: expensesData}})
  }

  function deleteExpense(id){
    dispatch({type: "DELETE", payload: id})
  }
  

  const expensesContext = {
    expensesList: expensesState,
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
