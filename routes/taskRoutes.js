// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');

// router.get('/tasks', taskController.listTasks);
// router.post('/tasks', taskController.addTask);
// router.put('/tasks/:taskId', taskController.editTask);
// router.delete('/tasks/:taskId', taskController.deleteTask);
// router.get('/tasks/deleted', taskController.listDeletedTasks);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');

// /**
//  * @swagger
//  * tags:
//  *   name: Tasks
//  *   description: The tasks managing API
//  */

// /**
//  * @swagger
//  * /tasks:
//  *   get:
//  *     summary: Get all tasks
//  *     tags: [Tasks]
//  *     parameters:
//  *       - in: query
//  *         name: userId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The user ID to filter tasks
//  *     responses:
//  *       200:
//  *         description: The list of tasks
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Task'
//  *       400:
//  *         description: Invalid user ID
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error
//  */
// router.get('/tasks', taskController.listTasks);

// /**
//  * @swagger
//  * /tasks:
//  *   post:
//  *     summary: Create a new task
//  *     tags: [Tasks]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               userId:
//  *                 type: string
//  *               subject:
//  *                 type: string
//  *               deadline:
//  *                 type: string
//  *                 format: date
//  *               status:
//  *                 type: string
//  *                 enum: [pending, in progress, completed]
//  *     responses:
//  *       201:
//  *         description: Task created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Task'
//  *       400:
//  *         description: Invalid request
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error
//  */
// router.post('/tasks', taskController.addTask);

// /**
//  * @swagger
//  * /tasks/{taskId}:
//  *   put:
//  *     summary: Update a task
//  *     tags: [Tasks]
//  *     parameters:
//  *       - in: path
//  *         name: taskId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the task to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               subject:
//  *                 type: string
//  *               deadline:
//  *                 type: string
//  *                 format: date
//  *               status:
//  *                 type: string
//  *                 enum: [pending, in progress, completed]
//  *     responses:
//  *       200:
//  *         description: The updated task
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Task'
//  *       400:
//  *         description: Invalid request
//  *       404:
//  *         description: Task not found or deleted
//  *       500:
//  *         description: Server error
//  */
// router.put('/tasks/:taskId', taskController.editTask);

// /**
//  * @swagger
//  * /tasks/{taskId}:
//  *   delete:
//  *     summary: Delete a task
//  *     tags: [Tasks]
//  *     parameters:
//  *       - in: path
//  *         name: taskId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the task to delete
//  *     responses:
//  *       200:
//  *         description: Task marked as deleted
//  *       400:
//  *         description: Invalid task ID
//  *       404:
//  *         description: Task not found or already deleted
//  *       500:
//  *         description: Server error
//  */
// router.delete('/tasks/:taskId', taskController.deleteTask);

// /**
//  * @swagger
//  * /tasks/deleted:
//  *   get:
//  *     summary: Get all deleted tasks
//  *     tags: [Tasks]
//  *     responses:
//  *       200:
//  *         description: The list of deleted tasks
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Task'
//  *       404:
//  *         description: No deleted tasks found
//  *       500:
//  *         description: Server error
//  */
// router.get('/tasks/deleted', taskController.listDeletedTasks);

// module.exports = router;

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: The tasks managing API
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to filter tasks
 *     responses:
 *       200:
 *         description: The list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 value: [
 *                   {
 *                     "subject": "Complete the project",
 *                     "deadline": "2024-08-13T19:23:37.434Z",
 *                     "status": "pending",
 *                     "isDeleted": false,
 *                     "subtasks": [],
 *                     "_id": "66bbc6ab9a968dfa2dd44d4d"
 *                   }
 *                 ]
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/tasks', taskController.listTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               subject:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *           examples:
 *             example1:
 *               value:
 *                 {
 *                   "userId": "60c72b2f5f1b2c001c8e4d0e",
 *                   "subject": "Complete the project",
 *                   "deadline": "2024-08-13T19:23:37.434Z",
 *                   "status": "pending"
 *                 }
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 value:
 *                   {
 *                     "subject": "Complete the project",
 *                     "deadline": "2024-08-13T19:23:37.434Z",
 *                     "status": "pending",
 *                     "isDeleted": false,
 *                     "subtasks": []
 *                   }
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/tasks', taskController.addTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
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
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *           examples:
 *             example1:
 *               value:
 *                 {
 *                   "subject": "Update the project",
 *                   "deadline": "2024-09-13T19:23:37.434Z",
 *                   "status": "in progress"
 *                 }
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 value:
 *                   {
 *                     "subject": "Update the project",
 *                     "deadline": "2024-09-13T19:23:37.434Z",
 *                     "status": "in progress",
 *                     "isDeleted": false,
 *                     "subtasks": [],
 *                     "_id": "66bbca292cb12cfbe4b5e4d6"
 *                   }
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Task not found or deleted
 *       500:
 *         description: Server error
 */
router.put('/tasks/:taskId', taskController.editTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task marked as deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 value:
 *                   {
 *                      "message": "Task marked as deleted"
 *                    }
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found or already deleted
 *       500:
 *         description: Server error
 */
router.delete('/tasks/:taskId', taskController.deleteTask);

/**
 * @swagger
 * /tasks/deleted:
 *   get:
 *     summary: Get all deleted tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of deleted tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 value: [
 *                   {
 *                     "subject": "Complete the project",
 *                     "deadline": "2024-08-13T19:23:37.434Z",
 *                     "status": "pending",
 *                     "isDeleted": true,
 *                     "subtasks": [],
 *                     "_id": "66b7be97692133438266c0d5"
 *                   }
 *                 ]
 *       404:
 *         description: No deleted tasks found
 *       500:
 *         description: Server error
 */
router.get('/tasks/deleted', taskController.listDeletedTasks);

module.exports = router;
