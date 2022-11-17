const express = require('express')
const router = express.Router();
const {createUser, loginUser} = require('../controllers/userController')

// create user
router.post('/', createUser)

// authenticate user 
router.post('/login', loginUser)


module.exports = router;