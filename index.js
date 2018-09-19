const express = require('express');
const bodyParser = require('body-parser');

// Create Express App
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to taskHeady application. The Task is Building a RESTful APIs from scratch using Express - Node.js. The Entities are a “Categories” and “Products”. Category can have multiple child categories. Child category can have further child categories. Category can have multiple products and product can have a multiple categories"});
});

// Require Products routes
require('./app/routes/product.routes.js')(app);

// Require Categories routes
require('./app/routes/category.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
