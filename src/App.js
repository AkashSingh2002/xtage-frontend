import React, { memo } from "react";
import { ReactFlowProvider } from "reactflow";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";  // Sidebar here in App.js
import AnalyticsPanel from "./components/AnalyticsPanel";
import "./App.css";

// Memoize Sidebar to avoid unnecessary re-renders
const MemoizedSidebar = memo(Sidebar);

const App = () => {
  return (
    <ReactFlowProvider>
      <div className="app-container" style={{ display: "flex", height: "100vh" }}>
        <MemoizedSidebar />  {/* Use memoized Sidebar */}
        <Canvas />
        <AnalyticsPanel />
      </div>
    </ReactFlowProvider>
  );
};

export default App;
