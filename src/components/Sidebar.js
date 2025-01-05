import React from "react";
import NodePropertiesForm from "./NodePropertiesForm";

const Sidebar = ({ selectedNode, updateNode }) => {
  return (
    <aside className="sidebar">
      <h3>Node Palette</h3>
      <div className="node" onDragStart={(e) => onDragStart(e, "start")} draggable>
        Start Node
      </div>
      <div className="node" onDragStart={(e) => onDragStart(e, "task")} draggable>
        Task Node
      </div>
      <div className="node" onDragStart={(e) => onDragStart(e, "decision")} draggable>
        Decision Node
      </div>
      <div className="node" onDragStart={(e) => onDragStart(e, "end")} draggable>
        End Node
      </div>
      <hr />
      <NodePropertiesForm selectedNode={selectedNode} updateNode={updateNode} />
    </aside>
  );
};

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export default Sidebar;
