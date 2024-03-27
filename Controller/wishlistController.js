const wishlists = require('../Models/wishlistModel')

exports.addToWishlist = async(req, res) => {
    const {id, title, price, description, category, image, rating} = req.body;
    const userId = req.payload;

    try {
        const existingProduct = await wishlists.findOne({id, userId})
        if(existingProduct){
            res.status(406).json('Product is already in your wishlist')
        }
        else{
            const newProduct = new wishlists({
                id, title, price, description, category, image, rating, userId
            })
            await newProduct.save();
            res.status(200).json("Successfully added to wishlist")
        }
    } catch (error) {
        res.status(401).json(error)
    }

}


exports.getItemsFromWishlist = async(req, res) => {

    const userId = req.payload;

    try {
        const allProducts = await wishlists.find({userId})
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(401).json("Error in getting wishlist items", error)
    }

}


exports.removeWishListItem = async(req, res) => {

    const id = req.params;

    try {
        const removedItem = await wishlists.findById({_id: id})
        res.status(200).json("Item removed from wishlist",removedItem);
    } catch (error) {
        res.status(401).json("Error in removing wishlist items", error)
    }

}