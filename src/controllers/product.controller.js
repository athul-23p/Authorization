const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const autheticate = require('../middlewares/authenticate');

router.get("", async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.post('',autheticate, async(req,res) => {
    req.body.seller = req.user._id;
    try {
        const product = await Product.create(req.body);
        return res.status(200).send(product);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.patch("/:id",autheticate,async(req,res) =>{
    try {

        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        console.log(req.body,product);
        return res.status(200).send(product);

    } catch (error) {
        return res.status(400).send(error);
        
    }
})
router.delete("/:id", autheticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
