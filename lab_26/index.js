const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');

const logMiddleware = (req, res, next) => 
    {
    const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
    fs.appendFileSync(path.join(__dirname, 'requests.log'), log);
    next();
};

app.use(express.static('public'));
app.use(express.json());

let products = [];

app.get('/product/list', (req, res) => {
    res.json(products);
});

app.post('/product/create', (req, res) => {
    const product = req.body;
    products.push(product);
    res.status(201).send('Product created');
});

app.put('/product/:id', (req, res) => {
    const id = req.params.id;
    const price = req.body.price;
    const product = products.find(p => p.id === id);
    if (product) {
        product.price = price;
        res.send('Product updated');
    } else {
        res.status(404).send('Product not found');
    }
});

app.delete('/product/:id', (req, res) => {
    const id = req.params.id;
    products = products.filter(p => p.id !== id);
    res.send('Product deleted');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(logMiddleware);