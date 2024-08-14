const validateTask = (task) => {
    if (!task.subject || !task.deadline || !task.status) {
      throw new Error('Validation error: Missing required fields for task');
    }
  };
  
  module.exports = { validateTask };
  