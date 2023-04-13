const express = require('express')

const router = express.Router()


const { registerUser, loginUser, userData } = require('../controllers/authController')
const authMiddleware = require('../config/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/userdata', authMiddleware, userData)

module.exports = router  