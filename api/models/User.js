const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

userSchema.plugin(
  passportLocalMongoose, {
    usernameField: 'email',
    // Ensure all email are lowercase
    usernameLowerCase: true,
    // disable sessions since we'll use JWT
    session: false
  })

const User = mongoose.model('User', userSchema)

module.exports = User