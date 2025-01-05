import React from "react";
import NodePropertiesForm from "./NodePropertiesForm";

const Sidebar = ({ selectedNode, updateNode }) => {
  return (
    <aside className="sidebar" style={{ padding: "10px", borderRight: "1px solid #ddd" }}>
      <h3>Node Palette</h3>
      <div
        className="node"
        onDragStart={(e) => onDragStart(e, "start")}
        draggable
        style={{ marginBottom: "10px", padding: "5px", backgroundColor: "#f0f0f0", cursor: "pointer" }}
      >
        Start Node
      </div>
      <div
        className="node"
        onDragStart={(e) => onDragStart(e, "task")}
        draggable
        style={{ marginBottom: "10px", padding: "5px", backgroundColor: "#f0f0f0", cursor: "pointer" }}
      >
        Task Node
      </div>
      <div
        className="node"
        onDragStart={(e) => onDragStart(e, "decision")}
        draggable
        style={{ marginBottom: "10px", padding: "5px", backgroundColor: "#f0f0f0", cursor: "pointer" }}
      >
        Decision Node
      </div>
      <div
        className="node"
        onDragStart={(e) => onDragStart(e, "end")}
        draggable
        style={{ marginBottom: "10px", padding: "5px", backgroundColor: "#f0f0f0", cursor: "pointer" }}
      >
        End Node
      </div>
      <hr />
      {/* Node Properties Form to display selected node's properties */}
      {selectedNode && (
        <NodePropertiesForm selectedNode={selectedNode} updateNode={updateNode} />
      )}
    </aside>
  );
};

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export default Sidebar;
