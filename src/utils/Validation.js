export const validateWorkflow = (nodes, edges) => {
    const errors = [];
    const startNodes = nodes.filter((node) => node.type === "start");
    if (startNodes.length > 1) errors.push("Only one Start node is allowed.");
  
    nodes.forEach((node) => {
      const connectedEdges = edges.filter(
        (edge) => edge.source === node.id || edge.target === node.id
      );
      if (connectedEdges.length === 0) errors.push(`Node ${node.data.label} is disconnected.`);
    });
  
    return errors;
  };
  