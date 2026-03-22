const express = require('express');
const cors = require('cors');
const path = require('path');

const products = require('./data/products');

const app = express();
const PORT = 5001;


app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',  
    'http://localhost:5175', 
    'http://localhost:4173',  
    'http://localhost:4174', 
    'http://localhost:3000',  
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    'http://127.0.0.1:4174', 
    'http://10.0.2.2:5001',   
    'capacitor://localhost',  
    'http://localhost'        
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

app.listen(PORT, () => {
  console.log(`✅ Backend: http://localhost:${PORT}`);
  console.log(`🔐 CORS allows: 5173, 5174, 5175, 4173, 4174, Android, Capacitor`);
});