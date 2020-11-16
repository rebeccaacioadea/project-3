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
  .get(dataController.getPlants)

// Editing OUR API
router.route('/plants/:id')
  .get(dataController.singlePlant)
  .delete(secureRoute, dataController.deletePlants)
  .put(secureRoute, dataController.editPlants)
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
  .get(secureRoute, userController.getUser)

module.exports = router 
