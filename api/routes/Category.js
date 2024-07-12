const express = require('express')
const mongoose = require('mongoose');
const Category = require('../models/Category');
const router = express.Router();

//post Category by admin 

router.post('/',(req,res)=>{
    const newCategory = new Category({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        imageUrl:req.body.imageUrl,
        imgId:req.body.imgId
    })
    newCategory.save()
    .then(result=>{
        res.status(200).json({
            new_Category:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})

//get All Categorys from database

router.get('/',(req,res)=>{
    Category.find()
    //Select( ) is optional .Its  used to select Which value you want to get  
    .select('_id name imageUrl imgId')
    .then(result=>{
        res.status(200).json({
            Category:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})



//Delete Category By Id

router.delete('/:id',(req,res)=>{
    Category.deleteOne({_id:req.params.id})
      //Select( ) is optional .Its  used to select Which value you want to get  
      .select('_id name imageUrl imgId')

      .then(result=>{
        res.status(200).json({
            Category:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})


//Update Category by id
router.put('/:id',(req,res)=>{
    //updateONe( ) take parameter first id of Category and the thing which is to be update
    //id come from params.id and thing come from req.body 
    Category.updateOne({_id:req.params.id},req.body)
    .then(result=>{
        res.status(200).json({
            Category:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            Error:err
        })
    })
})

// Category Cout 
router.get('/get/count',(req,res)=>{
    Category.find().countDocuments()
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

//return n number of category
router.get('/latest-category/:n',(req,res)=>{
    Category.find().sort({$natural:-1}).limit(req.params.n)
    .then(result=>{
        res.status(200).json({
            Category:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;