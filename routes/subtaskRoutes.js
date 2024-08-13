const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');

router.get('/tasks/:taskId/subtasks', subtaskController.listSubtasks);
router.post('/tasks/:taskId/subtasks', subtaskController.addSubtask);
router.put('/tasks/:taskId/subtasks/:subtaskId', subtaskController.editSubtask);
router.delete('/tasks/:taskId/subtasks/:subtaskId', subtaskController.deleteSubtask);
router.get('/tasks/:taskId/subtasks/deleted', subtaskController.listDeletedSubtasks);

module.exports = router;
