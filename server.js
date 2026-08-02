const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample product database
const products = [
  { id: 1, name: 'Laptop', price: 50000, stock: 5 },
  { id: 2, name: 'Headphones', price: 2000, stock: 10 },
  { id: 3, name: 'Smartphone', price: 15000, stock: 8 }
];

// In-memory orders
let orders = [];

// Home route
app.get('/', (req, res) => {
  res.json({
    message: '🛒 E-Commerce Backend Running Successfully',
    status: 'success'
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// Create a new order
app.post('/api/orders', (req, res) => {
  const { customer, items } = req.body;

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({
      message: 'Customer name and items are required'
    });
  }

  const order = {
    id: orders.length + 1,
    customer,
    items,
    createdAt: new Date()
  };

  orders.push(order);

  res.status(201).json({
    message: 'Order placed successfully 🎉',
    order
  });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    time: new Date()
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
