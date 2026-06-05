import { useState, useEffect } from "react";
import axios from "axios";

import { signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./Login";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";

function App() {
  const [user, setUser] = useState(null);

  const [expenses, setExpenses] = useState([]);

  const [filter, setFilter] = useState("All");

  const fetchExpenses = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/expenses/${user.uid}`
      );

      setExpenses(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const currentMonth =
    new Date().getMonth();

  const monthlyTotal = expenses
    .filter((expense) => {
      const expenseMonth =
        new Date(expense.date).getMonth();

      return (
        expenseMonth === currentMonth
      );
    })
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.category === filter
        );

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="dashboard-container">
      <h1>Expense Tracker</h1>
      <h4>UID: {user.uid}</h4>

      <h3>
        Welcome {user.email}
      </h3>

      <button onClick={logout}>
        Logout
      </button>

      <div className="stats">
        <div className="card">
          <h3>Total Spent</h3>

          <h2>
            ₹ {totalSpent}
          </h2>
        </div>

        <div className="card">
          <h3>This Month</h3>

          <h2>
            ₹ {monthlyTotal}
          </h2>
        </div>

        <div className="card">
          <h3>Total Expenses</h3>

          <h2>
            {expenses.length}
          </h2>
        </div>
      </div>

      <div className="card">
        <h2>
          Expense Breakdown
        </h2>

        <ExpenseChart
          expenses={expenses}
        />
      </div>

      <br />

      <div className="card">
        <h3>
          Filter by Category
        </h3>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
        >
          <option value="All">
            All
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Transport">
            Transport
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Other">
            Other
          </option>
        </select>
      </div>

      <br />

      <ExpenseForm
        user={user}
        refreshExpenses={
          fetchExpenses
        }
      />

      <br />

      <ExpenseList
        expenses={
          filteredExpenses
        }
        refreshExpenses={
          fetchExpenses
        }
      />
    </div>
  );
}

export default App;