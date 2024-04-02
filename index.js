const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const commentRoute = require(('./routes/comments'))
const  cookieParser = require('cookie-parser')
const cors  = require('cors')
const multer = require('multer')
const path = require('path')

console.log("backend start")
// connection with database
const connectDB = async()=>{
    try{
        console.log('conneting')
           await mongoose.connect(process.env.MONGO_URL)
           console.log("dp conencted")
       }catch(err){
         console.log(err)
    }
}
// middleware
dotenv.config()
// app.use(cors({origin: true,credentials:true}))
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(express.json())

app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)

// image upload
// define storage for the multer
//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is runing on port "+process.env.PORT)
})