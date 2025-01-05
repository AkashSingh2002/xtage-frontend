import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { validateWorkflow } from "../utils/Validation";
import { saveWorkflow, loadWorkflow } from "../utils/Storage";

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null); // State to store the selected node

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node); // Set the selected node
  }, []);

  const validateAndSave = () => {
    const errors = validateWorkflow(nodes, edges);
    setValidationErrors(errors);

    if (errors.length === 0) {
      saveWorkflow(nodes, edges);
      alert("Workflow saved successfully!");
    } else {
      alert("Validation failed. Please fix the errors.");
    }
  };

  useEffect(() => {
    const { savedNodes, savedEdges } = loadWorkflow();
    if (savedNodes.length > 0) setNodes(savedNodes);
    if (savedEdges.length > 0) setEdges(savedEdges);
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick} // Handle node clicks to select a node
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <button onClick={validateAndSave}>Save Workflow</button>
      {validationErrors.length > 0 && (
        <div className="validation-errors">
          {validationErrors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}

      {/* Display selected node details */}
      {selectedNode && (
        <div className="node-details" style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h3>Selected Node Details:</h3>
          <p><strong>Node ID:</strong> {selectedNode.id}</p>
          <p><strong>Label:</strong> {selectedNode.data.label}</p>
          <p><strong>Position:</strong> x: {selectedNode.position.x}, y: {selectedNode.position.y}</p>
          {/* You can add more details based on your node data */}
        </div>
      )}
    </div>
  );
};

export default Canvas;
