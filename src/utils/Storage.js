export const saveWorkflow = (nodes, edges) => {
    // Save the workflow nodes and edges as JSON strings in localStorage
    localStorage.setItem("workflowNodes", JSON.stringify(nodes));
    localStorage.setItem("workflowEdges", JSON.stringify(edges));
  };
  
  export const loadWorkflow = () => {
    try {
      // Try to load and parse the workflow nodes and edges from localStorage
      const savedNodes = localStorage.getItem("workflowNodes");
      const savedEdges = localStorage.getItem("workflowEdges");
  
      // Check if the saved data exists and is valid JSON
      const parsedNodes = savedNodes ? JSON.parse(savedNodes) : [];
      const parsedEdges = savedEdges ? JSON.parse(savedEdges) : [];
  
      return { savedNodes: parsedNodes, savedEdges: parsedEdges };
    } catch (error) {
      // If JSON parsing fails, log the error and return default empty arrays
      console.error("Error loading workflow from localStorage:", error);
      return { savedNodes: [], savedEdges: [] };
    }
  };
  