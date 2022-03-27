const express = require("express");
const {login,register,generateToken} = require('./controllers/auth.controller');
const productController = require('./controllers/product.controller');
const passport = require('./configs/google_oauth');

const app = express();
app.use(express.json());
app.use('/products',productController);
app.post('/register',register);
app.post('/login',login);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile","email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    
    let token = generateToken(req.user);
    res.status(200).send({msg:'logged in',user:req.user,token});
  }
);
module.exports = app;
