import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({ expenses }) {
  const categories = {
    Food: 0,
    Transport: 0,
    Shopping: 0,
    Other: 0,
  };

  expenses.forEach((expense) => {
    categories[expense.category] +=
      Number(expense.amount);
  });

  const data = {
    labels: Object.keys(categories),

    datasets: [
      {
        data: Object.values(categories),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "auto",
      }}
    >
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;