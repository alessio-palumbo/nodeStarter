const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Register
router.post('/auth/register',
  // Middlewate that handles the registration process
  authMiddleware.register,
  // json handler
  authMiddleWare.signJWTForUser
  // (req, res) => res.json({user: req.user})
)

// Sign In
router.post('auth',
  // Middleware that handles hte sign in
  authMiddleware.signIn,
  // json handler
  authMiddleware.signJWTForUser
  // (req, res) => res.json({ user: req.user })
)

module.exports = router