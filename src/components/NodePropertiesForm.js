import React, { useState, useEffect } from "react";

const NodePropertiesForm = ({ selectedNode, updateNode }) => {
  const [label, setLabel] = useState(selectedNode?.data.label || "");
  const [description, setDescription] = useState(selectedNode?.data.description || "");
  const [time, setTime] = useState(selectedNode?.data.time || "");
  
  // Update the form values when the selected node changes
  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label);
      setDescription(selectedNode.data.description);
      setTime(selectedNode.data.time);
    }
  }, [selectedNode]);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNode({
      ...selectedNode,
      data: { ...selectedNode.data, label, description, time },
    });
  };

  return (
    <div>
      <h4>Node Properties</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Node Label:</strong></label>
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            placeholder="Enter node label"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter node description"
            rows="4"
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="datetime-local"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <button type="submit">Update Node</button>
      </form>
    </div>
  );
};

export default NodePropertiesForm;
