// Load .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')

const server = express()

// Middleware plugins
server.use(bodyParser.json())
server.use(cors()) // Allow access from react front-end
server.use(authMiddleware.initialize) // Start passport

server.use([
  require('./routes/auth')
])

// Error handler
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

server.listen(7000, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server has started')
  }
})
