const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// register
router.post('/register',async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
        const newUser =  new User({username,email,password:hashedPassword})
    
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)

    }catch(err){
        res.status(500).json(err)
    }
})

// login
router.post('/login',async(req,res)=>{
    try{
      const  user = await User.findOne({email:req.body.email})
      console.log(user)
      if(!user){
        return res.status(404).json("User not found")
      }
      const match = await bcrypt.compareSync(req.body.password,user.password)
      if(!match){
        return res.status(404).json("Wrong credentials")
      }
      const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
      const {password,...info} = user._doc
       res.cookie("token",token).status(200).json(info)

       

    }catch(err){
        res.status(500).json(err)
    }


})


// logout
router.get('/logout',async(req,res)=>{
  try{
    console.log("logout")
    res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")
    console.log("logginggggg")

  }catch(err){
    console.log("logout err")
    res.status(500).json(err)
  }

})
// refresh user
router.get('/refetch',(req,res)=>{
  try{


  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  console.log("token")
  console.log(token)
  jwt.verify(token,process.env.SECRET,async(err,data)=>{
    if(err){
      console.log(data)
      return res.status(401).json({ message: `Unauthorized: Invalid token , ${err}` })
     
    }
    console.log(data)
    res.status(200).json(data)
  })
}catch(err){
  // console.log(data)
  console.error('Error during token verification:', err);
  res.status(500).json({ message: 'Internal Server Error' });

}

})

module.exports = router