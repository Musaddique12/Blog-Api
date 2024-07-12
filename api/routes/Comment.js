const express = require('express')
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const router = express.Router();
const  chechAuth = require('../ChechUserLogin/CheckAuth')
//post Comment by admin 

router.post('/',(req,res)=>{
    const newComment = new Comment({
        _id:new mongoose.Types.ObjectId,
        email:req.body.email,
        commentText:req.body.commentText,
        blogId:req.body.blogId
    })
    newComment.save()
    .then(result=>{
        res.status(200).json({
            new_Comment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})

//get All Comments from database

router.get('/',(req,res)=>{
    Comment.find()
    //Select( ) is optional .Its  used to select Which value you want to get  
    .select('_id email commentText blogId timestamp')
    .then(result=>{
        res.status(200).json({
            Comment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})

//get by blog ID
router.get('/blogId/:blogId',(req,res)=>{
    Comment.find({blogId:req.params.blogId})
      //Select( ) is optional .Its  used to select Which value you want to get  
      .then(result=>{
        res.status(200).json({
            comments:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})



//Delete Comment By Id

router.delete('/:id',(req,res)=>{
    Comment.deleteOne({_id:req.params.id})
      .then(result=>{
        res.status(200).json({
            comment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})


//Update Comment by id

// router.put('/:id',(req,res)=>{
//     //updateONe( ) take parameter first id of Comment and the thing which is to be update
//     //id come from params.id and thing come from req.body 
//     Comment.updateOne({_id:req.params.id},req.body)
//     .then(result=>{
//         res.status(200).json({
//             Comment:result
//         })
//     })
//     .catch(err=>{
//         console.log(err)
//         res.status(500).json({
//             Error:err
//         })
//     })
// })


// Comment Cout 
router.get('/get/count/:blogId',(req,res)=>{
    Comment.find({blogId:req.params.blogId}).countDocuments()
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
module.exports = router;