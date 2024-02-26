const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: { type: String },
    productTitle: { type:String },
    productPice: { type: String },
    quantity: { type: Number },
});

const CartItems = mongoose.model('CartItems', cartSchema);

module.exports = CartItems;