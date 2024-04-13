// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/shopping-cart-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Create a schema for the cart items
const cartItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

// Create a model based on the schema
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to add an item to the cart
app.post('/cart', async (req, res) => {
    const { name, quantity, price } = req.body;
    const newItem = new CartItem({ name, quantity, price });
    await newItem.save();
    res.send(newItem);
});

// Route to get all items in the cart
app.get('/cart', async (req, res) => {
    const items = await CartItem.find();
    res.send(items);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
