import axios from "axios";

export async function storeExpense(expenseData) {
  const reponse = await axios.post( "https://expense-tracker-app-5a576-default-rtdb.firebaseio.com/expense.json", expenseData);
  //Firebase prop to retrieve the generatedID
  //data is the response generated from axios
  const id = reponse.data.name
  return id
}

export const fetchExpenses = async ()  => {
  const response = await axios.get("https://expense-tracker-app-5a576-default-rtdb.firebaseio.com/expense.json");

  const data = response.data;

  const expenses = [];

  for (let key in data) {
    const responseObj = {
        id: key,
        amount: data[key]["amount"],
        description: data[key]["description"] ,
        date: new Date(data[key]["date"])
    }

    expenses.push(responseObj)
  }

  return expenses;
}

export const updateExpenseData = (id, expenseData) => {
  return axios.put(`https://expense-tracker-app-5a576-default-rtdb.firebaseio.com/expense/${id}.json`, expenseData)
}

export const deleteExpenseData = (id) =>{
  return axios.delete(`https://expense-tracker-app-5a576-default-rtdb.firebaseio.com/expense/${id}.json`)
}