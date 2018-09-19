const Category = require('../models/category.model.js');

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if(!req.body.name) {
      return res.status(400).send({
          message: "Category name can not be empty"
      });
  }

  // Create a Category
  const category = new Category({
      name: req.body.name,
      parentCategory: req.body.parent || 0
  });

  // Save Category in the database
  category.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Category."
      });
  });
};

// Retrieve and return all categories with all its child categories mapped to it
exports.findAll = (req, res) => {
  Category.aggregate([
    { "$addFields": { "parentCategory": { "$toString": "$_id" }}},
    { "$lookup": {
      "from": "categories",
      "localField": "parentCategory",
      "foreignField": "parentCategory",
      "as": "child_categories"
    }}
  ]).then(categories => {
      res.send(categories);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving categories."
      });
  });
};
