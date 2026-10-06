import { useState } from "react";
function App() {
  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600 text-center py-2">
        Expense Tracker
      </h1>
      <form
        className="flex flex-col gap-3 items-center"
        onSubmit={(eve) => {
          eve.preventDefault();
          const newExpense = {
            expenseName: expenseName,
            category: category,
            amount: Number(amount),
            id: Date.now(),
          };
      
          if (expenseName === "" || category === "" || amount === "") {
            return;
          }
          if (editingId === null) {
            setExpenses([...expenses, newExpense]);
          } else {
            const updateExpenses = expenses.map((expense) => {
              if (expense.id === editingId) {
                return {
                  expenseName:expenseName,
                  category: category,
                  amount: Number(amount),
                  id: expense.id
                };
              }else{
                return expense
              }
            });
            setExpenses(updateExpenses)
            setEditingId(null)
          }
          setExpenseName("");
          setCategory("");
          setAmount("");
        }}
      >
        <input
          className="w-full max-w-md rounded-lg border-gray-300 bg-white border px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => {
            setExpenseName(e.target.value);
          }}
        />
        <select 
        className="w-full max-w-md rounded-lg border-gray-300 bg-white border px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        value={category}
        onChange={(e)  => {
          setCategory(e.target.value)
        }}
        >
          <option value="" disabled>Select Category</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
        <input
          className="w-full max-w-md rounded-lg border-gray-300 bg-white border px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="number"
          placeholder="Enter Amount"
        />
        <button className="bg-blue-500 hover:bg-blue-600 py-2 px-3 text-white font-bold rounded-lg">
          {editingId === null ? "Add Expence" : "Update Expense"}
        </button>
      </form>
      <h1 className="font-semibold text-xl mb-2 p-2 ">
        Total Expense = Rs.
        {expenses.reduce((previous, current) => {
          return previous + current.amount;
        }, 0)}
      </h1>
      <div className="flex flex-wrap gap-4 mt-6 p-3">
        {expenses.map((expense) => {
          return (
            <div
              key={expense.id}
              className="w-72 bg-white  p-5 border-gray-200 border rounded-xl shadow-md "
            >
              <h1 className="text-lg font-semibold text-gray-800">
                Expense Name = {expense.expenseName}
              </h1>
              <h1 className="text-sm text-gray-500 mt-2">
                Category = {expense.category}
              </h1>
              <h1 className="text-xl font-bold text-gray-900 mt-3">
                Rs. {expense.amount}
              </h1>
              <div className="flex flex-wrap gap-6">
                <button
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-1 rounded-md font-bold"
                  onClick={() => {
                    setEditingId(expense.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-blue-500 py-1 px-4 rounded-md  text-white font-bold hover:bg-blue-600"
                  onClick={() => {
                    const newExpenses = expenses.filter((currentExpense) => {
                      return expense.id !== currentExpense.id;
                    });
                    setExpenses(newExpenses);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
