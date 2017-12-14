const mongoose = require('mongoose')

// Use the Promise functionality built into Node.js
mongoose.Promise = global.Promise

// Connect to local database
mongoose.connect(
  process.env.MONGO_URI,
  { useMongoClient: true }
)
  .then(() => {
    console.log('Successfully connected to database')
  })
  .catch(error => {
    console.error('Error to MongoDB database')
  })

module.exports = mongoose