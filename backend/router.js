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
  .get(secureRoute, dataController.getPlants)

// Editing OUR API
router.route('/plants/:id')
  .put(secureRoute, dataController.editPlants)
  .delete(secureRoute, dataController.deletePlants)
  .get(secureRoute, dataController.getPlantsByUser)

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
  .get(secureRoute, userController.getUser)

module.exports = router 
