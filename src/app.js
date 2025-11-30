const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API Inventario funcionando" });
});

module.exports = app;
