const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.spli(" ")[1]
            const user = jwt.verify(token, "Secretkey123")
            req.body.user= user
            next()
        } catch (error) {
             console.log(error);
             res.status(500).send(error)
        }
    }
    if(!token){
        res.status(400).json({msg: "Not authorised"})
    }
}