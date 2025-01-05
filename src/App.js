import React from "react";
import { ReactFlowProvider } from "reactflow";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";  // Sidebar here in App.js
import AnalyticsPanel from "./components/AnalyticsPanel";
import "./App.css";

const App = () => {
  return (
    <ReactFlowProvider>
      <div className="app-container" style={{ display: "flex", height: "100vh" }}>
        <Sidebar />  {/* Sidebar is here */}
        <Canvas />
        <AnalyticsPanel />
      </div>
    </ReactFlowProvider>
  );
};

export default App;
