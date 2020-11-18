const express = require('express')
const router = express.Router()
const dataController = require('./controllers/data')
const userController = require('./controllers/user')
const messageController = require('./controllers/message')
const secureRoute = require('./middleware/secureRoute')


// ? PLANTS
// Grabbing from external API
router.route('/plants-external/:query')
  .get(dataController.getExternalData)

// Adding to OUR API
router.route('/plants')
  .post(secureRoute, dataController.addPlants)
  .get(dataController.getPlants)

// Editing OUR API
router.route('/plants/:id')
  .get(dataController.singlePlant)
  .delete(secureRoute, dataController.deletePlants)
  .put(secureRoute, dataController.editPlants)

router.route('/users-plants/:userid')
  .get(dataController.getPlantsByUser)

// ? USERS
// REGISTER
router.route('/user/register')
  .post(userController.registerUser)

// LOGIN
router.route('/user/login')
  .post(userController.loginUser)

// FIND / EDIT
router.route('/user/users')
  .get(secureRoute, userController.listUsers)

router.route('/user/:userid')
  .put(secureRoute, userController.editUser)
  .delete(secureRoute, userController.deleteUser)
  .get(userController.getUser)

// ? MESSAGE BOARD 
// GET MESSAGES
router.route('/messages/message-board')
  .get(secureRoute, messageController.getMessages)
  .post(secureRoute, messageController.addMessage)

// router.route('/messages/:messageid/comments')
//   .post(secureRoute, messageController.postComment)
// 
// router.route('/messages/:messageid/:commentid')
//   .put(secureRoute, messageController.editComment)
//   .delete(secureRoute, messageController.deleteComment)

router.route('/messages/:messageid')
  .get(secureRoute, messageController.getMessage)
  .put(secureRoute, messageController.editMessage)
  .delete(secureRoute, messageController.deleteMessage)

module.exports = router 
