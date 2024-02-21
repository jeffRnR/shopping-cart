const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; 

// Connect to MongoDB
mongoose.connect('mongodb+srv://jeffmunyigi:RNRvinalo12!@cluster0.ubiibtd.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const cartItemSchema = new mongoose.Schema({
    productID: String,
    productTitle: String,
    productPrice: String,
    quantity: Number
});


const CartItem = mongoose.model('CartItem', cartItemSchema);

app.use(bodyParser.json());


app.post('/api/cart/add', async (req, res) => {
    try {
        const { productID, productTitle, productPrice, quantity } = req.body;
        
        const newItem = new CartItem({ productID, productTitle, productPrice, quantity });
        
        await newItem.save();
        res.status(200).json(newItem);
    } catch (err) {
        console.error('Error adding item to cart:', err);
        res.status(500).send('Internal server error');
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Corrected syntax
