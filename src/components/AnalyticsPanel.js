import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function AnalyticsPanel() {
  // Default chart data
  const initialData = {
    lineChart: {
      labels: ['January', 'February', 'March', 'April'],
      data: [65, 59, 80, 81],
    },
    barChart: {
      labels: ['Red', 'Blue', 'Yellow', 'Green'],
      data: [12, 19, 3, 5],
    },
    pieChart: {
      labels: ['Red', 'Blue', 'Yellow', 'Green'],
      data: [300, 50, 100, 75],
    },
  };

  // State to hold all charts' data
  const [chartsData, setChartsData] = useState(initialData);
  const [isPanelVisible, setIsPanelVisible] = useState(true); // State to toggle panel visibility

  // Handle input change for specific chart
  const handleInputChange = (chartId, index, value) => {
    setChartsData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[chartId].data[index] = value;
      return updatedData;
    });
  };

  // Toggle panel visibility
  const togglePanelVisibility = () => {
    setIsPanelVisible((prevVisibility) => !prevVisibility);
  };

  // Line chart configuration
  const lineChartData = {
    labels: chartsData.lineChart.labels,
    datasets: [
      {
        label: 'Line Dataset',
        data: chartsData.lineChart.data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Bar chart configuration
  const barChartData = {
    labels: chartsData.barChart.labels,
    datasets: [
      {
        label: 'Bar Dataset',
        data: chartsData.barChart.data,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  // Pie chart configuration
  const pieChartData = {
    labels: chartsData.pieChart.labels,
    datasets: [
      {
        data: chartsData.pieChart.data,
        backgroundColor: ['red', 'blue', 'yellow', 'green'],
      },
    ],
  };

  return (
    <div>
      {/* Only show the toggle button */}
      <button
        onClick={togglePanelVisibility}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        {isPanelVisible ? 'Hide Analytics' : 'Show Analytics'}
      </button>

      {/* Display the panel if it's visible */}
      {isPanelVisible && (
        <div>
          {/* Line Chart Section */}
          <div>
            <h2>Line Chart</h2>
            <form>
              {chartsData.lineChart.data.map((value, index) => (
                <div key={index}>
                  <label>
                    {chartsData.lineChart.labels[index]}:
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleInputChange('lineChart', index, Number(e.target.value))
                      }
                    />
                  </label>
                </div>
              ))}
            </form>
            <Line data={lineChartData} />
          </div>

          {/* Bar Chart Section */}
          <div>
            <h2>Bar Chart</h2>
            <form>
              {chartsData.barChart.data.map((value, index) => (
                <div key={index}>
                  <label>
                    {chartsData.barChart.labels[index]}:
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleInputChange('barChart', index, Number(e.target.value))
                      }
                    />
                  </label>
                </div>
              ))}
            </form>
            <Bar data={barChartData} />
          </div>

          {/* Pie Chart Section */}
          <div>
            <h2>Pie Chart</h2>
            <form>
              {chartsData.pieChart.data.map((value, index) => (
                <div key={index}>
                  <label>
                    {chartsData.pieChart.labels[index]}:
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleInputChange('pieChart', index, Number(e.target.value))
                      }
                    />
                  </label>
                </div>
              ))}
            </form>
            <Pie data={pieChartData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPanel;
