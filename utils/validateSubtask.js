const validateSubtask = (subtask) => {
    if (!subtask.subject || !subtask.deadline || !subtask.status) {
      throw new Error('Validation error: Missing required fields for subtask');
    }
  };
   
  module.exports = { validateSubtask };
  