// Load .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const server = express()

const router = express.Router()

router.use([

])

server.listen(7000, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server has started')
  }
})
