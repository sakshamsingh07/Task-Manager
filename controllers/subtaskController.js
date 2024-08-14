const mongoose = require('mongoose');
const User = require('../models/user');
const { validateSubtask } = require('../utils/validateSubtask');


exports.listSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid taskId format' });
    }

    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    const subtasks = task.subtasks.filter(subtask => !subtask.isDeleted);

    res.json(subtasks); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addSubtask = async (req, res) => {
  try {

    validateSubtask(req.body);
    const { taskId } = req.params;
    const { subject, deadline, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid taskId format' });
    }

    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    const newSubtask = {
      subject,
      deadline: new Date(deadline),
      status,
      isDeleted: false
    };

    task.subtasks.push(newSubtask);
    await user.save(); 

    res.status(201).json(newSubtask); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.editSubtask = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;
    const { subject, deadline, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(subtaskId)) {
      return res.status(400).json({ error: 'Invalid taskId or subtaskId format' });
    }

    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask || subtask.isDeleted) {
      return res.status(404).json({ error: 'Subtask not found or deleted' });
    }

    if (subject) subtask.subject = subject;
    if (deadline) subtask.deadline = new Date(deadline);
    if (status) subtask.status = status;

    await user.save(); 
    res.json(subtask); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteSubtask = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(subtaskId)) {
      return res.status(400).json({ error: 'Invalid taskId or subtaskId format' });
    }

    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: 'Task not found or deleted' });
    }

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask || subtask.isDeleted) {
      return res.status(404).json({ error: 'Subtask not found or deleted' });
    }

    subtask.isDeleted = true;

    await user.save(); 
    res.json({ message: 'Subtask marked as deleted' }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

