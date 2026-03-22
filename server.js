const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('./data/products');

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS: ONLY production URLs - NO localhost
app.use(cors({
  origin: [
    'https://react-ecommercerecente.vercel.app',
    'https://react-ecommercerecente-git-main-mizontheprogrammers-projects.vercel.app',
    'https://react-ecommerce-backend-tb4w.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

app.get('/', (req, res) => res.json({ status: 'OK' }));
app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ message: 'Not found' });
});
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});