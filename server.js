const express = require('express');
const cors = require('cors');
const path = require('path');

const products = require('./data/products');

const app = express();
// ✅ Use Render's PORT environment variable, fallback to 5001 for local
const PORT = process.env.PORT || 5001;

// ✅ CORS: Allow BOTH local AND deployed URLs
app.use(cors({
  origin: [
    // Local development
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:4173',
    'http://localhost:4174',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    'http://127.0.0.1:4174',
    
    // Android/Capacitor
    'http://10.0.2.2:5001',
    'capacitor://localhost',
    'http://localhost',
    
    // ✅ DEPLOYED FRONTEND (VERCEL) - ADD THIS:
    'https://react-ecommercerecente.vercel.app',
    'https://react-ecommercerecente-git-main-mizontheprogrammers-projects.vercel.app',
    
    // ✅ DEPLOYED BACKEND ITSELF (for testing)
    'https://react-ecommerce-backend-tb4w.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// ✅ Serve static assets (banners, images)
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Routes
app.get('/', (req, res) => res.json({ status: 'OK' }));

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product 
    ? res.json(product) 
    : res.status(404).json({ message: 'Not found' });
});

app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// ✅ Listen on Render's PORT or fallback to 5001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`🌐 Access via: https://react-ecommerce-backend-tb4w.onrender.com`);
});