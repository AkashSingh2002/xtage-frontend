// utils/Storage.js
export const saveWorkflow = ({ nodes, edges }) => {
    localStorage.setItem("workflowNodes", JSON.stringify(nodes));
    localStorage.setItem("workflowEdges", JSON.stringify(edges));
  };
  
  export const loadWorkflow = () => {
    try {
      // Retrieve and check if data exists in localStorage, otherwise return empty arrays
      const savedNodes = localStorage.getItem("workflowNodes");
      const savedEdges = localStorage.getItem("workflowEdges");
  
      // Check if savedNodes and savedEdges are null or undefined, then return empty arrays
      return {
        savedNodes: savedNodes ? JSON.parse(savedNodes) : [],
        savedEdges: savedEdges ? JSON.parse(savedEdges) : [],
      };
    } catch (error) {
      console.error("Error loading workflow from localStorage", error);
      return { savedNodes: [], savedEdges: [] };  // Return empty arrays in case of an error
    }
  };
  