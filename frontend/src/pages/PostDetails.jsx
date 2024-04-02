import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comments from '../components/Comments'
import { useNavigate, useParams } from 'react-router-dom'
import { IF, URL } from '../url'
import axios from 'axios'
import { UserContext } from '../assets/context/UserContext'
import Loader from '../components/Loader'

const PostDetails = () => {
  const {user} = useContext(UserContext)
  const [post,setPost] = useState({})
  const [loader,setLoader] = useState(false)
  const [comments,setComments] = useState([])
  const [comment,setComment] = useState([])
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)

  const postComment = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post(window.location.origin+"/api/comments/create",{comment:comment,author:user.username,postId:id ,userId:user._id},{withCredentials:true})
    console.log(res)
    setComment("")
    fetchPostComment()


    }catch(err){
      console.log((err,"comment err"))

    }

  }

  const fetchPostComment = async()=>{
    try{
      const res = await axios.get(window.location.origin+"/api/comments/post/"+id)
      setComments(res.data)
    }catch(err){
      console.log(err)

    }

  }  

  // -----------
  const handleDeletePost = async()=>{
    try{
     const res =  await axios.delete(window.location.origin + "/api/posts/" + id,{withCredentials:true})
      console.log("deleted")
      console.log(res.data)
      navigate('/')

    }catch(err){

    }

  }

  const fetchPost = async()=>{
    setLoader(true)
    try{
     const res = await axios.get(window.location.origin+'/api/posts/'+id)
     console.log(res.data,"post details data")
     setLoader(false)
     setPost(res.data)


    }catch(err){
      setLoader(true)
      console.log(err)
    }

  }
  useEffect(()=>{
fetchPost()
fetchPostComment()
  },[id])
  return (
    <div >
      <Navbar/>
      {loader?
      <div className='h-[80vh] flex justify-center items-center w-full'>
      <Loader/>
        </div>
      :<div className="px-8 md:px-[200px] mt-8">
         <div className="flex justify-between items-center">
            <h1 className='text-2xl font-bold text-black md:text-3xl'>
          
          {post?.title}
             </h1>

            {user && user?._id === post?.userId &&
            <div className="flex items-center justify-center space-x-2">
                <p className='cursor-pointer'
                 onClick={()=>navigate('/edit/'+id)}
                ><BiEdit/></p>
                <p className='cursor-pointer'
                onClick={handleDeletePost}
                ><MdDelete/></p>
            </div>}
           
           
         </div>
         <div className="flex items-center justify-between mt-2 md:mt-4">
         <p>@{post?.username}</p>
                <div className="flex space-x-2">
                <p>{new Date(post?.updatedAt).toString().slice(0,15)}
                        </p>
                    <p>
                    {new Date(post?.updatedAt).toString().slice(15,21)}
                    </p>
                </div>
         </div>
         <img src={IF + post?.photo}
         className='w-full mx-auto mt-8'
         alt="" />
         <p className='mx-auto mt-8'>
          
          {post.desc}
         </p>
         <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post?.categories?.map((item,idx)=>{
                return(
                   <div
                   key={idx}
                   className="bg-gray-300 rounded-lg px-3 py-1">
                    {item}
                </div> 
                )
              })}

                {/* <div className="bg-gray-300 rounded-lg px-3 py-1">
                    Tech
                </div> */}
                {/* <div className="bg-gray-300 rounded-lg px-3 py-1">
                    Ai
                </div> */}
            </div>


         </div>
        <div className='flex flex-col mt-4'>
            <h3 className='mt-6 mb-4 font-semibold'>Comments:</h3>
            {/* comments */}
            {comments?.map((c)=>(
                <Comments key={c._id} c={c} post={post}/>

            ))}
        
        
        
          
            {/* comment */}
        
        
        </div>
        {/* write a comments */}
        <div className="w-full flex flex-col
        mt-4 md:flex-row">
            <input type="text"
            placeholder='write a comment'
             className='md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0'
             value={comment}
             onChange={(e)=>{setComment(e.target.value)}}
             />
             <button
             onClick={postComment}
             className='bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0'
             >Add Comment</button>

        </div>


      </div>}
      <Footer/>
    </div>
  )
}

export default PostDetails
