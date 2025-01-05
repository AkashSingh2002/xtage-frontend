import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const cumulativeData = data.reduce((acc, node, idx) => {
    const prevCumulativeTime = idx > 0 ? acc[idx - 1].y : 0;
    acc.push({ x: node.label, y: prevCumulativeTime + node.executionTime });
    return acc;
  }, []);

  const chartData = {
    datasets: [
      {
        label: "Cumulative Execution Time (ms)",
        data: cumulativeData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Cumulative Time: ${tooltipItem.raw} ms`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
