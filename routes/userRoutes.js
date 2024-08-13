const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to add a new user
router.post('/users', userController.addUser);

// Route to get all users
router.get('/users', userController.listUsers);

// Route to get a specific user by ID
router.get('/users/:userId', userController.getUser);

// Route to update a user by ID
router.put('/users/:userId', userController.updateUser);

// Route to delete a user by ID
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
