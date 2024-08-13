const mongoose = require('mongoose');
const User = require('../models/user');
const { validateSubtask, validateSubtasks } = require('../utils/validateSubtask');


exports.listSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Validate taskId format
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid taskId format' });
    }

    // Find the user who has the task
    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the specific task
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    // Filter subtasks to exclude deleted ones
    const subtasks = task.subtasks.filter(subtask => !subtask.isDeleted);

    res.json(subtasks); // Respond with the list of non-deleted subtasks
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addSubtask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { subject, deadline, status } = req.body;

    // Validate taskId format
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid taskId format' });
    }

    // Find the user who has the task
    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the specific task
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    // Create new subtask
    const newSubtask = {
      subject,
      deadline: new Date(deadline),
      status,
      isDeleted: false
    };

    // Push new subtask to the task's subtasks array
    task.subtasks.push(newSubtask);
    await user.save(); // Save the updated user document

    res.status(201).json(newSubtask); // Respond with the newly created subtask
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.editSubtask = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;
    const { subject, deadline, status } = req.body;

    // Validate taskId and subtaskId format
    if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(subtaskId)) {
      return res.status(400).json({ error: 'Invalid taskId or subtaskId format' });
    }

    // Find the user who has the task
    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the specific task
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    // Find the specific subtask
    const subtask = task.subtasks.id(subtaskId);
    if (!subtask || subtask.isDeleted) {
      return res.status(404).json({ error: 'Subtask not found or deleted' });
    }

    // Update subtask details
    if (subject) subtask.subject = subject;
    if (deadline) subtask.deadline = new Date(deadline);
    if (status) subtask.status = status;

    await user.save(); // Save the updated user document
    res.json(subtask); // Respond with the updated subtask
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// In your subtaskController.js

exports.deleteSubtask = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;

    // Validate taskId and subtaskId format
    if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(subtaskId)) {
      return res.status(400).json({ error: 'Invalid taskId or subtaskId format' });
    }

    // Find the user who has the task
    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the specific task
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    // Find the specific subtask
    const subtask = task.subtasks.id(subtaskId);
    if (!subtask || subtask.isDeleted) {
      return res.status(404).json({ error: 'Subtask not found or deleted' });
    }

    // Mark the subtask as deleted
    subtask.isDeleted = true;

    await user.save(); // Save the updated user document
    res.json({ message: 'Subtask marked as deleted' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listDeletedSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Validate taskId format
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid taskId format' });
    }

    // Find the user who has the task
    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the specific task
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    // Filter subtasks to include only deleted ones
    const deletedSubtasks = task.subtasks.filter(subtask => subtask.isDeleted);

    res.json(deletedSubtasks); // Respond with the list of deleted subtasks
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
