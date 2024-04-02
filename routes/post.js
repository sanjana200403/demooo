const express = require('express')
const router = express.Router()
const User  = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')
// create
router.post('/create',verifyToken,async(req,res)=>{
    try{
   const newPost = new Post(req.body)
   console.log(newPost)
   const savedPost =  await newPost.save()
   console.log(savedPost)
   res.status(200).json(savedPost)

    }catch(err){
          res.status(500).json(err)
    }

})

// update
router.put('/:id',verifyToken,async(req,res)=>{
    try{
       const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)

    }catch(err){
        res.status(500).json(err)

    }

})

// Delete
router.delete('/:id',verifyToken,async(req,res)=>{
    try{
       await Post.findByIdAndDelete(req.params.id)
       await Comment.deleteMany({postId:req.params.id})
       res.status(200).json("PoST has been deleted")
        

    }catch(err){
        res.status(500).json(err)

    }

})
// Get Post Details
router.get('/:id',async(req,res)=>{
    try{
     const post = await  Post.findById(req.params.id)
     console.log("post details" , post)
     res.status(200).json(post)
        
        

    }catch(err){
        res.status(500).json(err)

    }

})
// get all post
router.get('/',async(req,res)=>{
    console.log("allpost")
    const query = req.query
    // console.log(query)
    try{
const searchFilter = {
    title:{$regex:query.search, $options:"i"}
}

     const posts = await  Post.find(query.search?searchFilter:null)
     console.log("post details" , posts)
     res.status(200).json(posts)
        
        

    }catch(err){
        res.status(500).json(err)

    }
})
// get post of particular user
router.get('/user/:userId',async(req,res)=>{
    try{
        const post = await Post.find({userId:req.params.userId})
        res.status(200).json(post)
        console.log(post,"particular user posts")
     

    }catch(err){
        res.status(500)

    }

})
// search post



module.exports= router