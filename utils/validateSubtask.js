// utils/validateSubtask.js
const validateSubtask = (subtask) => {
    if (!subtask.subject || !subtask.deadline || !subtask.status) {
      throw new Error('Validation error: Missing required fields for subtask');
    }
  };
  
  // Function to validate an array of subtasks
  const validateSubtasks = (subtasks) => {
    if (!Array.isArray(subtasks)) {
      throw new Error('Validation error: Subtasks should be an array');
    }
    subtasks.forEach(subtask => validateSubtask(subtask));
  };
  
  module.exports = { validateSubtask, validateSubtasks };
  