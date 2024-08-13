// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Route to add a new user
// router.post('/users', userController.addUser);

// // Route to get all users
// router.get('/users', userController.listUsers);

// // Route to get a specific user by ID
// router.get('/users/:userId', userController.getUser);

// // Route to update a user by ID
// router.put('/users/:userId', userController.updateUser);

// // Route to delete a user by ID
// router.delete('/users/:userId', userController.deleteUser);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: The users managing API
//  */

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     responses:
//  *       200:
//  *         description: The list of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/User'
//  *       500:
//  *         description: Server error
//  */
// router.get('/users', userController.listUsers);

// /**
//  * @swagger
//  * /users:
//  *   post:
//  *     summary: Create a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/User'
//  *       400:
//  *         description: Invalid request
//  *       500:
//  *         description: Server error
//  */
// router.post('/users', userController.addUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user management API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             examples:
 *               example1:
 *                 value: [
 *                   {
 *                     "name": "John Doe",
 *                     "email": "john.doe@example.com",
 *                     "tasks": [
 *                       {
 *                         "subject": "Complete the project",
 *                         "deadline": "2024-08-13T19:23:37.434Z",
 *                         "status": "pending",
 *                         "isDeleted": false,
 *                         "subtasks": [],
 *                         "_id": "66b7be97692133438266c0d5"
 *                       }
 *                     ]
 *                   },
 *                   {
 *                     "_id": "66bbc3139275511a15e9d6b8",
 *                     "name": "stringsingh",
 *                     "email": "string@test.com",
 *                     "tasks": [],
 *                     "__v": 0
 *                   }
 *                 ]
 *       500:
 *         description: Server error
 */
router.get('/users', userController.listUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *           examples:
 *             example1:
 *               value:
 *                 {
 *                   "name": "string",
 *                   "email": "string"
 *                 }
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               example1:
 *                 value:
 *                   {
 *                     "name": "John Doe",
 *                     "email": "john.doe@example.com",
 *                     "_id": "66bbc3139275511a15e9d6b8",
 *                     "tasks": [],
 *                     "__v": 0
 *                   }
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post('/users', userController.addUser);

module.exports = router;
