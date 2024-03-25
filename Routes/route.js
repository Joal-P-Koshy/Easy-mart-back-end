
const expess = require('express');

const productController = require('../Controller/productController');

const userController = require('../Controller/userController')

const router = new expess.Router();

// get all products
router.get('/all-product', productController.getallProducts)

//user registration
router.post('/register', userController.registerController)

// login user
router.post('/login', userController.loginController)

module.exports = router;