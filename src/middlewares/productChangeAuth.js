const Product = require('../models/product.model');
const prodChangeAuth = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id).lean().exec();
       
        if(req.user.roles.includes('admin') || product.seller.toString() === req.user._id){
            return next();
        }
        return res.status(400).send({msg:'Unauthorized access'});
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = prodChangeAuth;