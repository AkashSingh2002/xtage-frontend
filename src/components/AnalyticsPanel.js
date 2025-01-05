import React from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const AnalyticsPanel = () => {
  return (
    <div className="analytics-panel">
      <h3>Analytics</h3>
      <BarChart />
      <LineChart />
      <PieChart />
    </div>
  );
};

export default AnalyticsPanel;
