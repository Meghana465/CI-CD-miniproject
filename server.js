const express = require('express');
const app = express();

app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', price: 50000 },
  { id: 2, name: 'Headphones', price: 2000 },
  { id: 3, name: 'Smartphone', price: 15000 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/', (req, res) => {
  res.send('E-Commerce Backend Running Successfully');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
