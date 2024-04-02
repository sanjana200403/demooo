import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { UserContext } from '../assets/context/UserContext'
import { URL } from '../url'
import { BiUpload } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IF } from '../url'

const CreatePost = () => {
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState('')
    const [file,setFile] = useState(null)
    const [cat,setCat] = useState("")
    const [cats,setCats] = useState([])
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    console.log(file)

    const addCategory = ()=>{
        const updatedCats = [...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)

    }
    const deleteCategory = (idx)=>{
        let updatedCats = [...cats]
        updatedCats.splice(idx)
        setCats(updatedCats)


    }
    const handleCreate = async(e)=>{
     e.preventDefault()
     const post = {
        title,
        desc,
        username:user.username,
        userId:user._id,
        categories:cats
     }
     if(file){
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        post.photo=filename
        // console.log(data)
        // img upload
        try{
            const imgUpload = await axios.post(window.location.origin+"/api/upload",data)
            console.log(imgUpload.data)
     
          }catch(err){
             console.log(err + "img err upload")
          }

     }
    //  post Upload
    try{
        const res=await axios.post(window.location.origin+"/api/posts/create",post,{withCredentials:true})
        navigate("/posts/post/"+res.data._id)
        console.log(res.data)

    }catch(err){
console.log(err)
    }
   
     
    }
  return (
    <div>
        <Navbar/>
        <div className="px-6 md:px-[200px] mt-8">
            <h1 className='font-bold md:text-2xl text-xl'>Create a Post</h1>
            <form action=""
            className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'
            >
                <input 
                onChange={(e)=>{setTitle(e.target.value)}}
                type="text" 
                placeholder='Enter post title'
                className='px-4 py-2 outline-none'
                />
                 <input type="file" 
                 onChange={(e)=>{setFile(e.target.files[0])}}
                placeholder='Enter post title'
                className='px-4 '
                />
                <div className="flex flex-col">
                    <div className='flex items-center space-x-4 md:space-x-8'>
                        <input type="text"
                        value={cat}
                        onChange={(e)=>{
                            setCat(e.target.value)
                        }}
                        className='px-4 py-2 outline-none' 
                        placeholder='Enter post Category'
                    
                        />
                        <div 
                        onClick={addCategory}
                        className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>

                    </div>
                    {/* categories */}
                    <div className='flex px-4 mt-3'>
                        { cats.map((c,idx)=>(
  <div key={idx} className="flex justify-center space-x-2
  mr-2 bg-gray-200 px-2 py-1
  rounded-md">
      <p>{c}</p>
      <p 
      onClick={()=>{
        deleteCategory(idx)
      }}
      className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
  </div>
                        ))}
                  
                  
                    {/* 2 */}
                    {/* <div className="flex justify-center space-x-2
                    mr-2 bg-gray-200 px-2 py-1
                    rounded-md">
                        <p>Tech</p>
                        <p className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
                    </div> */}
                    </div>
                  
                  
                </div>
                <textarea name="" 
                onChange={(e)=>{setDesc(e.target.value)}}
                className="px-4 py-2 outline-none"
                placeholder='Enter the Post Description'
                cols={30} rows={10}></textarea>
                <button
                onClick={handleCreate}
                className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>


            </form>


        </div>
        <Footer/>
      
    </div>
  )
}

export default CreatePost
