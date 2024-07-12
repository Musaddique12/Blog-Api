const express = require('express')
const router = express.Router()
const User = require('../models/Auth')
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { route } = require('./Blog')
//User signup
router.post('/user/signup',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err+"Hash error "
            })
        }else{
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                fullName:req.body.fullName,
                email:req.body.email,
                password:hash
            })

            user.save()
            .then(result=>{
              return  res.status(200).json({
                    newUser:result
                })
            })
            .catch(error=>{
                console.log(error)
                res.status(500).json({
                    error:error
                })
            })
        }
    })
})

router.post('/user/login',(req,res)=>{
    User.find({email:req.body.email})
    .then(user=>{
        console.log(user)
       if(user.length<1)
        {
            return  res.status(404).json({
                message:'User not found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
               return  res.status(404).json({
                    message:'password not maching'
                } )
            }
            
            const token = jwt.sign({
                email:user[0].email,
                password:user[0].fullName,
                userType:'User'
            },'i am musa',
        {
            expiresIn:'365d'
        })
        res.status(200).json({
            email:user[0].email,
            fullName:user[0].fullName,
            token:token
        })
        })
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            err:error
        })
    })
})


//admin login

router.post('/admin/login',(req,res)=>{
    if(req.body.userName == 'musa@123' && req.body.password == '123456')
        {
            const token = jwt.sign({
                email:'abcd@gmail.com',
                fullName:'musaddique',
                userType:'admin'
            },'i am musa',
        {
            expiresIn:'365d'
        })
       return res.status(200).json({
            fullName:'musaddique',
            email:'abcd@gmail.com',
            token:token
        })
        }

    res.status(404).json({
        msg:'Auth js  request  fail'
    })
})

module.exports = router;