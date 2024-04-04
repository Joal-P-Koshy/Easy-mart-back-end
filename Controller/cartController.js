
const carts = require('../Models/cartModel');

exports.addToCart = async (req, res) => {
    const userId = req.payload;
    const { id, title, price, description, category, image, rating, quantity } = req.body;
    try {
        const existingProduct = await carts.findOne({ id, userId })
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price;
            existingProduct.save();
            res.status(200).json("Item added to cart")

        }
        else {
            const newProduct = new carts({
                userId, id, title, price, description, category, image, rating, quantity, grandTotal: price
            })
            newProduct.save();
            res.status(200).json("New item added to cart")
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getItemsFromCart = async (req, res) => {

    const userId = req.payload;

    try {
        const allProducts = await carts.find({ userId })
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(401).json("Error in getting cart items")
    }

}


exports.removeCartItem = async (req, res) => {

    const { id } = req.params;

    try {
        const removedItem = await carts.findByIdAndDelete({ _id: id })
        res.status(200).json('Item removed from Cart');
    } catch (error) {
        res.status(401).json("Error in removing cart items")
    }

}


exports.incrementItem = async (req, res) => {

    const { id } = req.params;

    try {
        const selectedItem = await carts.findOne({ _id: id });
        if (selectedItem) {
            selectedItem.quantity += 1;
            selectedItem.grandTotal = selectedItem.price * selectedItem.quantity;
            selectedItem.save();
            res.status(200).json(selectedItem);
        }
        else {
            res.status(401).json("No such item")

        }
    } catch (error) {
        res.status(401).json("Error in incrementing cart items")
    }
}

exports.decrementItem = async (req, res) => {

    const { id } = req.params;

    try {
        const selectedItem = await carts.findOne({ _id: id });
        if (selectedItem) {
            selectedItem.quantity -= 1;
            if (selectedItem.quantity == 0) {
                await carts.deleteOne({ _id: id });
                res.status(200).json('Item removed from cart');
            }
            else {
                selectedItem.grandTotal = selectedItem.price * selectedItem.quantity;
                selectedItem.save();
                res.status(200).json(selectedItem);
            }
        }
        else {
            res.status(401).json("No such item")
        }
    } catch (error) {
        res.status(401).json("Error in decrementing cart items")
    }
}


exports.emptyCart = async(req, res) => {

    const userId = req.payload;

    try {
        await carts.deleteMany({userId: userId})
        res.status(200).json("cart deleted successfully")
    } catch (error) {
        res.status(401).json(error)
    }
}
