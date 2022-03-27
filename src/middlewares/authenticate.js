const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
    return new Promise((resolve,reject) =>{
        jwt.verify(token,process.env.SECRET,(err,decoded) => {
            if(err) return reject(err);

            return resolve(decoded);
        })
    })
}

const autheticate = async (req,res,next) => {
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")){
        return res.status(400).send({message: "Authorization token not found or incorrect"});
    }

    const token = req.headers.authorization.trim().split(" ")[1];

    try {
        let decoded = await verifyToken(token);
        // console.log(decoded);
        req.user = decoded.user;
    } catch (error) {
          console.log(error);
          return res
            .status(400)
            .send({ message: "jwt : something went wrong" });
    }
    return next();
}

module.exports = autheticate;