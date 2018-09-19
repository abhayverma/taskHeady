const Product = require('../models/product.model.js');

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if(!req.body.name || !req.body.price) {
      return res.status(400).send({
          message: "Product info can not be empty (name, price)"
      });
  }

  // Create a Product
  const product = new Product({
      name: req.body.name,
      price: req.body.price,
      imgUrl: req.body.img_url || "https://cdn4.iconfinder.com/data/icons/Aire%20PNGs/512/Start%20Menu/Computer.png",
      categories: req.body.categories,
      description: req.body.description
  });

  // Save Product in the database
  product.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Product."
      });
  });
};

// Retrieve and return all products from the requested category using categoryId in the request
exports.findAll = (req, res) => {
  Product.find({ "categories": req.params.categoryId })
  .then(products => {
      if(!products.length) {
          return res.status(404).send({
              message: "Products not found mapped with categoryId " + req.params.categoryId
          });
      }
      res.send(products);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Product not found with categoryId " + req.params.categoryId
          });
      }
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving products."
      });
  });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.name || !req.body.price) {
      return res.status(400).send({
          message: "Product name & price can not be empty"
      });
  }

  // Find product and update it with the request body
  Product.findByIdAndUpdate(req.params.productId, {
      name: req.body.name,
      price: req.body.price,
      imgUrl: req.body.img_url || "https://cdn4.iconfinder.com/data/icons/Aire%20PNGs/512/Start%20Menu/Computer.png",
      categories: req.body.categories,
      description: req.body.description
  }, {new: true})
  .then(product => {
      if(!product) {
          return res.status(404).send({
              message: "Product not found with id " + req.params.productId
          });
      }
      res.send(product);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Product not found with id " + req.params.productId
          });
      }
      return res.status(500).send({
          message: "Error updating Product with id " + req.params.productId
      });
  });
};
