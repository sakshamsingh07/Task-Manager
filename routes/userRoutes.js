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


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
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
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post('/users', userController.addUser);

module.exports = router;
