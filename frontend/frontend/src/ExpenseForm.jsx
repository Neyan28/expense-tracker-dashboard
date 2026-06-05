import { useState } from "react";
import axios from "axios";

function ExpenseForm({
  user,
  refreshExpenses,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] =
    useState("Food");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/expenses",
        {
          user_id: user.uid,
          title,
          amount: Number(amount),
          category,
          date,
        }
      );

      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");

      refreshExpenses();
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <br />
        <br />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <br />
        <br />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;