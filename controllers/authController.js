const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async(req, res) =>{
    const {user, email, password} = req.body

    const userExist = await User.findOne({email})

    if(userExist){

           return res.status(200).send({success:false, msg:"User already Exists with this email"})
    }
    else{
        try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const newEntry = await User.create({
                user: user,
                email: email,
                password: hashPassword
            })
            // newEntry.save()
            // console.log(newEntry);   
            
            return res.status(200).send({success:true, msg:"Registration successful"})
        } catch (error) {
            return res.status(400).send({success:false, msg:"error"})
        }
    }
}

const loginUser = async(req, res) => {
        
        const{email, password} =req.body
        try {
            const user = await User.findOne({email})
            if(user){
                if(user && (await bcrypt.compare(password, user.password))){
                    const tokenData ={
                        _id: user._id,
                        user: user.user,
                        email: user.email

                    }
                 const token = jwt.sign(tokenData, "Secretkey123", {expiresIn:'30d'})
                    return  res.status(200).send({success:true, msg:"Login Successful", token:token})
                }
                else{
                    return res.status(200).send({success:false, msg:"Invalid Credentials"})
                }
            }else{
                   return res.status(200).send({success:false, msg:"Invalid Credentials"})
            } 
            
        } catch (error) {
             return res.send("error")
        }
}

const userData = async(req, res)=>{
    try {
        res.status(200).send({success:true, data:req.body.user})
        
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    userData
}