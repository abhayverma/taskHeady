module.exports = (app) => {
    const categories = require('../controllers/category.controller.js');

    // Create a new Category
    app.post('/category', categories.create);

    // Retrieve All Categories mapped with all its child categories
    app.get('/category', categories.findAll);
}
