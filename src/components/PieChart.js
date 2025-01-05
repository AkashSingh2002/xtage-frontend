import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = ({ data }) => {
  const nodeTypes = [...new Set(data.map((node) => node.type))];

  const executionTimeByType = nodeTypes.map((type) => {
    return data
      .filter((node) => node.type === type)
      .reduce((acc, node) => acc + node.executionTime, 0);
  });

  const chartData = {
    labels: nodeTypes,
    datasets: [
      {
        label: "Execution Time Distribution",
        data: executionTimeByType,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Execution Time: ${tooltipItem.raw} ms`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
