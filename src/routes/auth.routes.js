const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');


// Create a new auth
router.post('/login', authController.login);

// Retrieve all auth
//router.get('/', authController.findAll);

// Create a new auth
//router.post('/', authController.create);

// Retrieve a single auth with id
//router.get('/:id', authController.findById);

// Update updateUserInGroup
router.put('/updateUserInGroup', authController.updateUserInGroup);

// Update a auth with id
router.put('/:id', authController.update);



// Delete a auth with id
//router.delete('/:id', authController.delete);

module.exports = router