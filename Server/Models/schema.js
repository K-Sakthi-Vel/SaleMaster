// requiring mongooose
const mongoose = require("mongoose");
// declaring document fields
const productSchema = new mongoose.Schema({
    products :{
        type: Array,
        required:true
    }
})

const Product = mongoose.model("Product",productSchema)

module.exports = Product;