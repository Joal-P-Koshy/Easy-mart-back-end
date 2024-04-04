
const expess = require('express');

const productController = require('../Controller/productController');

const userController = require('../Controller/userController')

const router = new expess.Router();

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const wishlistController = require('../Controller/wishlistController')

const cartController = require('../Controller/cartController')

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

// add item to cart
router.post('/add-cart', jwtMiddleware, cartController.addToCart)

// get item from cart
router.get('/cart/all-product', jwtMiddleware, cartController.getItemsFromCart)

// remove item from cart
router.delete('/cart/removeItem/:id', jwtMiddleware,cartController.removeCartItem)


// increment in cart 
router.get(`/cart/increment/:id`, jwtMiddleware, cartController.incrementItem)

// decrement in cart 
router.get(`/cart/decrement/:id`, jwtMiddleware, cartController.decrementItem)

// remove all cart items
router.delete(`/removeCart`, jwtMiddleware, cartController.emptyCart)


module.exports = router;