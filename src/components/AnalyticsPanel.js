import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { validateWorkflow } from "../utils/Validation";
import { saveWorkflow, loadWorkflow } from "../utils/Storage";

function AnalyticsPanel() {
  const [inputValues, setInputValues] = useState([50]); // Array to store multiple input values
  const [labels, setLabels] = useState(['Category 1']); // Array to store multiple labels
  const [units, setUnits] = useState(['minutes']); // Array to store unit of time for each value
  const [isPanelVisible, setIsPanelVisible] = useState(false); // Set the panel to be hidden initially

  // Load saved data from localStorage
  useEffect(() => {
    // Load previous values, labels, and units if available
    const savedInputValues = JSON.parse(localStorage.getItem('inputValues')) || [50];
    const savedLabels = JSON.parse(localStorage.getItem('labels')) || ['Category 1'];
    const savedUnits = JSON.parse(localStorage.getItem('units')) || ['minutes'];
    setInputValues(savedInputValues);
    setLabels(savedLabels);
    setUnits(savedUnits);
  }, []);

  // Convert the values based on selected units (minutes or hours)
  const convertValues = (values, units) => {
    return values.map((value, index) => {
      if (units[index] === 'hours') {
        return value * 60; // Convert hours to minutes
      }
      return value; // Keep the value as is for minutes
    });
  };

  const chartData = convertValues(inputValues, units);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Line Dataset',
        data: chartData,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Bar Dataset',
        data: chartData,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const pieChartData = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: ['red', 'blue', 'yellow', 'green'],
      },
    ],
  };

  // Handle input value change
  const handleInputChange = (index, newValue) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = newValue;
    setInputValues(updatedValues);
  };

  // Handle label change
  const handleLabelChange = (index, newLabel) => {
    const updatedLabels = [...labels];
    updatedLabels[index] = newLabel;
    setLabels(updatedLabels);
  };

  // Handle unit change (minutes or hours)
  const handleUnitChange = (index, newUnit) => {
    const updatedUnits = [...units];
    updatedUnits[index] = newUnit;
    setUnits(updatedUnits);
  };

  // Handle adding a new value, label, and unit
  const addNewValueLabelUnit = () => {
    setInputValues((prev) => [...prev, 50]);
    setLabels((prev) => [...prev, `Category ${labels.length + 1}`]);
    setUnits((prev) => [...prev, 'minutes']); // Default to 'minutes'
  };

  // Handle saving the workflow and chart data
  const handleSave = () => {
    // Validate input values and labels
    const errors = validateWorkflow(inputValues, labels);
    if (errors.length === 0) {
      // Save workflow data to localStorage
      saveWorkflow(inputValues, labels);

      // Save chart data to localStorage
      localStorage.setItem('inputValues', JSON.stringify(inputValues));
      localStorage.setItem('labels', JSON.stringify(labels));
      localStorage.setItem('units', JSON.stringify(units));

      alert('Data saved successfully!');
    } else {
      alert(`Errors: ${errors.join(', ')}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Toggle button */}
      <button
        onClick={() => setIsPanelVisible((prev) => !prev)}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        style={{ alignSelf: 'center' }}
      >
        {isPanelVisible ? 'Hide Analytics' : 'Show Analytics'}
      </button>

      {isPanelVisible && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          {/* Input form */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h2>Input Chart Data</h2>
            {inputValues.map((value, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <label>
                  {labels[index]}:
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(index, Number(e.target.value))}
                    className="border rounded p-1 ml-2"
                    placeholder="Value (minutes or hours)"
                  />
                  <input
                    type="text"
                    value={labels[index]}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className="border rounded p-1 ml-2"
                    placeholder="Label"
                  />
                  <select
                    value={units[index]}
                    onChange={(e) => handleUnitChange(index, e.target.value)}
                    className="ml-2 p-1 border rounded"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select>
                </label>
              </div>
            ))}
            <button
              onClick={addNewValueLabelUnit}
              className="mb-4 p-2 bg-green-500 text-white rounded"
            >
              Add New Value/Label
            </button>
          </div>

          {/* Charts */}
          <div style={{ display: 'flex', justifyContent: 'space-evenly', flex: 1 }}>
            {/* Line Chart */}
            <div style={{ flex: 1, padding: '10px' }}>
              <h2>Line Chart</h2>
              <Line data={lineChartData} />
            </div>

            {/* Bar Chart */}
            <div style={{ flex: 1, padding: '10px' }}>
              <h2>Bar Chart</h2>
              <Bar data={barChartData} />
            </div>

            {/* Pie Chart */}
            <div style={{ flex: 1, padding: '10px' }}>
              <h2>Pie Chart</h2>
              <Pie data={pieChartData} />
            </div>
          </div>

          {/* Save Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={handleSave}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Save Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPanel;
