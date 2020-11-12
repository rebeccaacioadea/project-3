const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function registerUser(req, res) {
  const body = req.body
  console.log('hello')
  User
    .create(body)
    .then(user => {
      res.send(user)
    })
    .catch(err => res.send(err))
}

function loginUser(req, res) {
  User
    .findOne({ userName: req.body.userName })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Invalid User' })
      }
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Invalid Password' })
      }

      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '50hr' }
      )

      res.status(202).send({ token, message: 'Login was successful' })
    
    })
    .catch(err => res.send(err))
}

// function editUser(req, res) {

// }

// function deleteUser(req, res) {

// }


module.exports = {
  registerUser,
  loginUser
}