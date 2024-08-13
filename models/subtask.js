const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  isDeleted: { type: Boolean, default: false }
});

module.exports = subtaskSchema;
