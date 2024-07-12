const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const  verify = jwt.verify(token,'i am musa')
        console.log(verify)
        if(verify. userType=='User'){
            next()
        }
        else{
            return res.status(401).json({
                error:"user not valid and not next"
            })
        }
    }
    catch(err){
        return res.status(401).json({
            message:"not a valid student"
        })
    }
} 