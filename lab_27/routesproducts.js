const express = require('express');
const router = express.Router();
const productController = require('./controllersproductController'); // Виправлений шлях

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
