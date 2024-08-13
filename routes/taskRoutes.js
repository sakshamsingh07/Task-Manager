const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.listTasks);
router.post('/tasks', taskController.addTask);
router.put('/tasks/:taskId', taskController.editTask);
router.delete('/tasks/:taskId', taskController.deleteTask);
router.get('/tasks/deleted', taskController.listDeletedTasks);

module.exports = router;
