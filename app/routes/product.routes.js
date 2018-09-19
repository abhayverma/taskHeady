module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create a new Product
    app.post('/product', products.create);

    // Retrieve Products with Category
    app.get('/product/:categoryId', products.findAll);

    // Update a Product with productId
    app.put('/product/:productId', products.update);
}
