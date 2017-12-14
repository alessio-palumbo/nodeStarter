const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../models/User')

const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = process.env.JWT_ALGORITHM
const jwtExpiresIn = process.env.JWT_EXPIRATION

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User({
    email: req.body.firstName,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  // Create the user with the specified password
  User.register(user,
    req.body.password, (error, user) => {
      if (error) {
        // Our register middleware failed
        next(error)
        return
      }
      // Store user so we can access it in our handler
      req.user = user
      // Success
      next()
    })
}

passport.use(new PassportJwt.Strategy({
  // Where will the JWT be passed in the HTTP request?
  // Authorization: Bearer..
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // What is the secret
  secretOrKey: jwtSecret,
  // What algorithm(s) was used to sign it?
  algorithms: [jwtAlgorithm]
},
  // When we have a verified token
  (payload, done) => {
    // Find the real user from our database using the 'id' in the JWT
    User.findById(payload.sub)
      .then(user => {
        // If user was found with this id
        if (user) {
          done(null, user)
          // If user was not found
        } else {
          done(null, false)
        }
      })
      .catch(error => {
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) => {
  // Get user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    {
      // Payload
      email: user.email
    },
    // Secret
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Send the token
  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}