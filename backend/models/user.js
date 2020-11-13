const mongoose = require('mongoose')
// Encryption Library
const bcrypt = require('bcrypt')
// Password Validator
const uniqueValidator = require('mongoose-unique-validator')
const mongooseHidden = require('mongoose-hidden')

const badgeSchema = new mongoose.Schema({
  badgeOne: { type: Boolean, required: false },
  badgeTwo: { type: Boolean, required: false },
  badgeThree: { type: Boolean, required: false },
  badgeFour: { type: Boolean, required: false },
  badgeFive: { type: Boolean, required: false },
  badgeSix: { type: Boolean, required: false },
  badgeSeven: { type: Boolean, required: false },
  badgeEight: { type: Boolean, required: false },
  badgeNine: { type: Boolean, required: false },
  badgeTen: { type: Boolean, required: false }
})

const userSchema = new mongoose.Schema({
  image: { type: String, required: false },
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { 
    type: String, required: true, unique: true,  
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: { 
    type: String, required: true, minlength: 6, 
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
  },
  owner: { type: Boolean, required: false },
  sitter: { type: Boolean, required: false },
  postcode: { type: String, required: true },
  isAdmin: { type: Boolean },
  // Embedded Relationship, badges are unique to each user
  badges: [badgeSchema]
})

// Hiding the good stuff
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true } }))

// Password Check
userSchema.plugin(uniqueValidator)

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Should Match Password')
    }
    next()
  })

// Covering it up
userSchema
  .pre('save', function hashPassword(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
  })

// Validating the user password with the password that we've stored
userSchema.methods.validatePassword = function validatePassword(password) {
  // Encrypt password to compare
  return bcrypt.compareSync(password, this.password)
}

// ! THE DARK SIDE OF POSTCODES
// userSchema
//   .virtual('getPostcode')
//   .set(function setGetCoordinates(getPostcode) {
//     this.latitude = this._getPostcode.results.latitude
//   })

module.exports = mongoose.model('User', userSchema)