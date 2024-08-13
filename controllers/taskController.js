const mongoose = require('mongoose');
const User = require('../models/user');
const { validateTask } = require('../utils/validateTask');


exports.listTasks = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const user = await User.findById(userId, 'tasks').lean(); // Use lean() for faster queries
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter tasks and subtasks in a single pass
    const tasks = user.tasks.reduce((filteredTasks, task) => {
      if (!task.isDeleted) {
        task.subtasks = task.subtasks.filter(subtask => !subtask.isDeleted);
        filteredTasks.push(task);
      }
      return filteredTasks;
    }, []);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addTask = async (req, res) => {
  try {
    validateTask(req.body);

    const { userId, subject, deadline, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newTask = {
      subject,
      deadline,
      status,
      isDeleted: false,
      subtasks: []
    };

    user.tasks.push(newTask);
    await user.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.editTask = async (req, res) => {
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

    // Update task details
    if (subject) task.subject = subject;
    if (deadline) task.deadline = new Date(deadline);
    if (status) task.status = status;

    await user.save(); // Save the updated user document
    res.json(task); // Respond with the updated task
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  
exports.deleteTask = async (req, res) => {
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
      return res.status(404).json({ error: 'Task not found or already deleted' });
    }

    // Mark the task as deleted
    task.isDeleted = true;

    await user.save(); // Save the updated user document
    res.json({ message: 'Task marked as deleted' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listDeletedTasks = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find().lean(); // Use lean() for faster queries

    if (!users) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Find all tasks marked as deleted
    const deletedTasks = users.flatMap(user =>
      user.tasks.filter(task => task.isDeleted) // Filter tasks marked as deleted
    );

    if (deletedTasks.length === 0) {
      return res.status(404).json({ message: 'No deleted tasks found' });
    }

    res.json(deletedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
