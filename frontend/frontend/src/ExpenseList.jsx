import axios from "axios";

function ExpenseList({
  expenses,
  refreshExpenses,
}) {
  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/expenses/${id}`
      );

      refreshExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Your Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense.id}
            className="expense-card"
          >
            <h3>{expense.title}</h3>

            <p>
              ₹ {expense.amount}
            </p>

            <p>
              {expense.category}
            </p>

            <p>
              {expense.date}
            </p>

            <button
              onClick={() =>
                deleteExpense(
                  expense.id
                )
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;