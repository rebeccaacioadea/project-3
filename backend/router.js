const express = require('express')

const router = express.Router()
// const dataController = require('./controllers/data')
const userController = require('./controllers/user')
// const secureRoute = require('./middleware/secureRoute')


// // * PLANTS
// // Grabbing from external API
// router.route('/plants-external/:query')
//   .get(dataController.getPlants)

// // Adding to OUR API
// // ! + SECURE ROUTE
// router.route('/plants')
//   .post(dataController.addPlants)

// // Editing OUR API
// // ! + SECURE ROUTE
// router.route('/plants/:id')
//   .put(dataController.editPlants)
//   .delete(dataController.deletePlants)


// * USERS
// Register
router.route('/user/register')
  .post(userController.registerUser)

// Login
router.route('/user/login')
  .post(userController.loginUser)

// router.route('/user/login/:userid')
//   .put(userController.editUser)
//   .delete(userController.deleteUser)


module.exports = router 
