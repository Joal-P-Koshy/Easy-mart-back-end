

const products = require('../Models/productModel')


// get all products
exports.getallProducts = async(req, res) => {
    try {
        const allProducts = await products.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(406).json(error)
    }
}