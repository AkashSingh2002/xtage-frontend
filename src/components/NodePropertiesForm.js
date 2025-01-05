import React from "react";
import "../App.css"

const NodePropertiesForm = ({ selectedNode, updateNode }) => {
  if (!selectedNode) {
    return <div style={{ textAlign: "center" }}>Select a node to edit its properties.</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateNode(selectedNode.id, { ...selectedNode.data, [name]: value });
  };

  return (
    <div className="node-properties" style={{ fontSize: "14px" }}>
      <h3 style={{ textAlign: "center" }}>Node Properties</h3>
      <label>
        Label:
        <input
          type="text"
          name="label"
          value={selectedNode.data.label || ""}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>
      <label>
        Execution Time:
        <input
          type="number"
          name="executionTime"
          value={selectedNode.data.executionTime || ""}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>
      <label>
        Type:
        <select
          name="type"
          value={selectedNode.type}
          onChange={(event) =>
            updateNode(selectedNode.id, {
              ...selectedNode.data,
              type: event.target.value,
            })
          }
          style={{ width: "100%" }}
        >
          <option value="task">Task</option>
          <option value="decision">Decision</option>
          <option value="start">Start</option>
          <option value="end">End</option>
        </select>
      </label>
    </div>
  );
};

export default NodePropertiesForm;
