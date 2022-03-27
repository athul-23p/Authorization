const authorize = (permittedRoles) => (req,res,next) => {
    // console.log(permittedRoles);
    
    let isPermitted= false;

    permittedRoles.forEach(role =>{
        if(req.user.roles.includes(role))
            isPermitted = true;
    })

    if(isPermitted){
        
        return next();
    }
    else{
        return res.status(401).send({msg: 'Unauthorized access'});
    }
}

module.exports = authorize;