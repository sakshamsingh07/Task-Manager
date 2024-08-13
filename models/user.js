const mongoose = require('mongoose');
const taskSchema = require('./task');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tasks: [taskSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
