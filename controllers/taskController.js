const mongoose = require('mongoose');
const User = require('../models/user');
const { validateTask } = require('../utils/validateTask');


exports.listTasks = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const user = await User.findById(userId, 'tasks').lean(); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

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

   
    if (subject) task.subject = subject;
    if (deadline) task.deadline = new Date(deadline);
    if (status) task.status = status;

    await user.save(); 
    res.json(task); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  
exports.deleteTask = async (req, res) => {
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
      return res.status(404).json({ error: 'Task not found or already deleted' });
    }

    task.isDeleted = true;

    await user.save(); 
    res.json({ message: 'Task marked as deleted' }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.listDeletedTasks = async (req, res) => {
  try {
    const users = await User.find().lean(); 

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    const deletedTasks = users.flatMap(user => {
      if (user.tasks && Array.isArray(user.tasks)) {
        return user.tasks.filter(task => task.isDeleted); 
      }
      return []; 
    });

    if (deletedTasks.length === 0) {
      return res.status(404).json({ message: 'No deleted tasks found' });
    }

    res.json(deletedTasks); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
