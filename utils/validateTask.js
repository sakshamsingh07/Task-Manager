const validateTask = (task) => {
    if (!task.subject || !task.deadline || !task.status) {
      throw new Error('Validation error: Missing required fields for task');
    }
  };
  
  const validateSubtask = (subtask) => {
    if (!subtask.subject || !subtask.deadline || !subtask.status) {
      throw new Error('Validation error: Missing required fields for subtask');
    }
  };
  
  module.exports = { validateTask, validateSubtask };
  