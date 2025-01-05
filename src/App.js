import React from "react";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";
import AnalyticsPanel from "./components/AnalyticsPanel";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <Canvas />
      <AnalyticsPanel />
    </div>
  );
};

export default App;
