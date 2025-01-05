import React from "react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <div className="node" onDragStart={(e) => onDragStart(e, "task")} draggable>
        Task Node
      </div>
      <div className="node" onDragStart={(e) => onDragStart(e, "decision")} draggable>
        Decision Node
      </div>
      <div className="node" onDragStart={(e) => onDragStart(e, "end")} draggable>
        End Node
      </div>
    </aside>
  );
};

export default Sidebar;
