// const express = require('express');
// const router = express.Router();
// const subtaskController = require('../controllers/subtaskController');

// router.get('/tasks/:taskId/subtasks', subtaskController.listSubtasks);
// router.post('/tasks/:taskId/subtasks', subtaskController.addSubtask);
// router.put('/tasks/:taskId/subtasks/:subtaskId', subtaskController.editSubtask);
// router.delete('/tasks/:taskId/subtasks/:subtaskId', subtaskController.deleteSubtask);
// router.get('/tasks/:taskId/subtasks/deleted', subtaskController.listDeletedSubtasks);

// module.exports = router;


const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');

/**
 * @swagger
 * tags:
 *   name: Subtasks
 *   description: The subtasks managing API
 */

/**
 * @swagger
 * /tasks/{taskId}/subtasks:
 *   get:
 *     summary: Get all subtasks for a task
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to get subtasks from
 *     responses:
 *       200:
 *         description: The list of subtasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subtask'
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found or deleted
 *       500:
 *         description: Server error
 */
router.get('/tasks/:taskId/subtasks', subtaskController.listSubtasks);

/**
 * @swagger
 * /tasks/{taskId}/subtasks:
 *   post:
 *     summary: Create a new subtask
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to add a subtask to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *     responses:
 *       201:
 *         description: Subtask created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtask'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Task not found or deleted
 *       500:
 *         description: Server error
 */
router.post('/tasks/:taskId/subtasks', subtaskController.addSubtask);

/**
 * @swagger
 * /tasks/{taskId}/subtasks/{subtaskId}:
 *   put:
 *     summary: Update a subtask
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task containing the subtask
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subtask to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *     responses:
 *       200:
 *         description: The updated subtask
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtask'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Subtask not found or deleted
 *       500:
 *         description: Server error
 */
router.put('/tasks/:taskId/subtasks/:subtaskId', subtaskController.editSubtask);

/**
 * @swagger
 * /tasks/{taskId}/subtasks/{subtaskId}:
 *   delete:
 *     summary: Delete a subtask
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task containing the subtask
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subtask to delete
 *     responses:
 *       200:
 *         description: Subtask marked as deleted
 *       400:
 *         description: Invalid subtask ID
 *       404:
 *         description: Subtask not found or already deleted
 *       500:
 *         description: Server error
 */
router.delete('/tasks/:taskId/subtasks/:subtaskId', subtaskController.deleteSubtask);

module.exports = router;

