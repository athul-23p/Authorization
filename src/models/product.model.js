const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {type:String,required:true},
    price: {type:Number,default:0,min:0},
    seller :{
        type: mongoose.Schema.Types.ObjectId,
        path:'user',
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('product',productSchema);

