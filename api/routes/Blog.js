const express = require('express')
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const router = express.Router();
const checkAdmin = require('../ChechUserLogin/AdminAuth')

//post blog by admin 

router.post('/',checkAdmin,(req,res)=>{
    const newBlog = new Blog({
        _id:new mongoose.Types.ObjectId,
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        imgId:req.body.imgId
    })
    newBlog.save()
    .then(result=>{
        res.status(200).json({
            new_Blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})

//get All Blogs from database

router.get('/',(req,res)=>{
    Blog.find()
    //Select( ) is optional .Its  used to select Which value you want to get  
    .select('_id title category description imageUrl imgId')
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})


//get blog by id
router.get('/:id',(req,res)=>{
    Blog.find({_id:req.params.id})
      //Select( ) is optional .Its  used to select Which value you want to get  
      .select('_id category title description imageUrl imgId')

      .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})


//get blog by category
router.get('/category/:category',(req,res)=>{
    Blog.find({category:req.params.category})
      //Select( ) is optional .Its  used to select Which value you want to get  
      .select('_id category title description imageUrl imgId')

      .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})


//Delete Blog By Id

router.delete('/:id',checkAdmin,(req,res)=>{
    Blog.deleteOne({_id:req.params.id})
      //Select( ) is optional .Its  used to select Which value you want to get  
      .select('_id category title description imageUrl imgId')

      .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})


//Update Data by id
router.put('/:id',checkAdmin,(req,res)=>{
    //updateONe( ) take parameter first id of blog and the thing which is to be update
    //id come from params.id and thing come from req.body 
    Blog.updateOne({_id:req.params.id},req.body)
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})

//Total Blog Count
router.get('/get/count',(req,res)=>{
    Blog.find().countDocuments()
    .then(result=>{
        res.status(200).json({
            total:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})


router.get('/latest-post/:n',(req,res)=>{
    Blog.find().sort({$natural:-1}).limit(req.params.n)
    .then(result=>{
        res.status(200).json({
            Blog:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;