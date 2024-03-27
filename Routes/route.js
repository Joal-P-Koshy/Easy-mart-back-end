
const expess = require('express');

const productController = require('../Controller/productController');

const userController = require('../Controller/userController')

const router = new expess.Router();

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const wishlistController = require('../Controller/wishlistController')

// get all products
router.get('/all-product', productController.getallProducts)

//user registration
router.post('/register', userController.registerController)

// login user
router.post('/login', userController.loginController)

// get product details by ID
router.get('/get-product/:id', productController.getProductDetailsByID)

// add to wishlist 
router.post('/add-wishlist', jwtMiddleware,wishlistController.addToWishlist)

// get wishlist items
router.get('/wishlist/all-product', jwtMiddleware,wishlistController.getItemsFromWishlist)

// remove item from wishlist
router.delete('/wishlist/removeItem/:id', jwtMiddleware,wishlistController.removeWishListItem)

module.exports = router;