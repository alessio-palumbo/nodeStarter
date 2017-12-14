const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Register
router.post('/auth/register', authMiddleware.register, authMiddleware.signJWTForUser)

// Sign In
router.post('/auth', authMiddleware.signIn, authMiddleware.signJWTForUser)

module.exports = router