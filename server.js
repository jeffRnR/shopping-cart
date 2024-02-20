const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Corrected typo in bodyParser

const app = express();
const PORT = process.env.PORT || 5000; // Corrected PORT variable

// Connect to MongoDB
mongoose.connect('mongodb+srv://jeffmunyigi:RNRvinalo12!@cluster0.ubiibtd.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err)); // Improved error logging

// Define schema for cart item
const cartItemSchema = new mongoose.Schema({
    productID: String,
    productTitle: String,
    productPrice: String,
    quantity: Number
});

// Create model based on schema
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle adding item to cart
app.post('/api/cart/add', async (req, res) => {
    try {
        const { productID, productTitle, productPrice, quantity } = req.body;
        // Create new cart item instance
        const newItem = new CartItem({ productID, productTitle, productPrice, quantity });
        // Save item to MongoDB
        await newItem.save();
        res.status(200).json(newItem); // Respond with the newly added item
    } catch (err) {
        console.error('Error adding item to cart:', err);
        res.status(500).send('Internal server error'); // Send generic error response
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Corrected syntax
