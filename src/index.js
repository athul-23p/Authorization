const express = require("express");
const {login,register} = require('./controllers/auth.controller');
const productController = require('./controllers/product.controller');
const app = express();
app.use(express.json());
app.use('/products',productController);
app.post('/register',register);
app.post('/login',login);
module.exports = app;
