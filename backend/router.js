const express = require('express')
const router = express.Router()
const dataController = require('./controllers/data')
const userController = require('./controllers/user')
const messageController = require('./controllers/message')
const socialController = require('./controllers/social')
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
  .get(userController.listUsers)

router.route('/user/:userid')
  .put(secureRoute, userController.editUser)
  .delete(secureRoute, userController.deleteUser)
  .get(userController.getUser)

// ? MESSAGE BOARD 
// GET/POST MESSAGES
router.route('/messages/message-board')
  .get(secureRoute, messageController.getMessages)
  .post(secureRoute, messageController.addMessage)

// POST COMMENT
router.route('/messages/:messageid/comment')
  .post(secureRoute, messageController.postComment)
// DELETE COMMENT
router.route('/messages/:messageid/:commentid')
  .delete(secureRoute, messageController.deleteComment)
// GET/DELETE MESSAGE
router.route('/messages/:messageid')
  .get(secureRoute, messageController.getMessage)
  .delete(secureRoute, messageController.deleteMessage)

// ? SOCIAL BOARD
// GET/POST TO FEED
router.route('/social')
  .get(secureRoute, socialController.getFeed)
  .post(secureRoute, socialController.postFeed)
// GET SOCIAL BY USER
router.route('/users-social/:userid')
  .get(socialController.getUserFeed)
// POST COMMENT
router.route('/social/:socialid/comment')
  .post(secureRoute, socialController.postComment)
// NESTED COMMENTS
router.route('/social/:socialid/:commentid/:nestedid')
  // .delete(secureRoute, socialController.deleteNestedComment)
// DELETE COMMENT/POST NESTED COMMENT
router.route('/social/:socialid/:commentid')
  .delete(secureRoute, socialController.deleteComment)
  // .post(secureRoute, socialController.postNestedComment)
// DELETE SOCIAL
router.route('/social/:socialid')
  .delete(secureRoute, socialController.deleteFeedPost)

// POSTCODE API
router.route('/post-code/:postcode')
  .get(userController.postcodeGet)

module.exports = router 
