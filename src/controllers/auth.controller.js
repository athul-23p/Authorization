
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user.model');
const generateToken = (user) => jwt.sign({user},process.env.SECRET);
const register = async(req,res)=>{
    try {
        // check if email already exists
        let user = await User.findOne({email:req.body.email}).lean().exec();
        if(user){
            return res.status(400).send({msg:"Email already registerd"})
        }

        user = await User.create(req.body);
        return res.status(201).send({name:user.name,email: user.email, roles: user.roles});

    } catch (error) {
        return res.status(500).send(error);
    }
}

const login = async(req,res) => {
     try {
       // 
       let user = await User.findOne({ email: req.body.email });
       // if user exists
    //    console.log(user);
       if (!user) {
           return res.status(400).send({ msg: "user does not exists" });
        }
        // check if password matches
        const match = user.checkPassword(req.body.password)
        if(!match){
            return res.status(400).send({ msg: "Email or password does not match" });
        }
        
        const token = generateToken(user);
        
        const { name, email, roles } = user;
        return res
          .status(200)
          .send({ user: { name, email, roles }, token });
        
      

     } catch (error) {
       
        return res.status(500).send(error);
     }
}
module.exports = {register,login};