const express = require('express')
const router = express.Router()
const dataController = require('./controllers/data')
const userController = require('./controllers/user')
const secureRoute = require('./middleware/secureRoute')


// ? PLANTS
// Grabbing from external API
router.route('/plants-external/:query')
  .get(dataController.getExternalData)

// Adding to OUR API
router.route('/plants')
  .post(secureRoute, dataController.addPlants)

// Editing OUR API
router.route('/plants/:id')
  .put(secureRoute, dataController.editPlants)
  .delete(secureRoute, dataController.deletePlants)


// ? USERS
// REGISTER
router.route('/user/register')
  .post(userController.registerUser)

// LOGIN
router.route('/user/login')
  .post(userController.loginUser)

// EDIT
router.route('/user/login/:userid')
  .put(secureRoute, userController.editUser)
  .delete(secureRoute, userController.deleteUser)


module.exports = router 
