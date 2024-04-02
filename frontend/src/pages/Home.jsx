import React, { useContext, useState } from 'react'
import HomePost from '../components/HomePost'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import axios from 'axios'
import { URL } from '../url'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../assets/context/UserContext'

const Home = () => {
  const [posts,setPosts] = useState([false])
  const [noResult,setNoResult] = useState(false)
  const [loader,setLoader] = useState(false)
  const {user} = useContext(UserContext)
  console.log(user)
const {search} = useLocation()
console.log(search)
console.log(window.location.origin+'/api/posts'+search)

  const fetchPosts = async()=>{
    setLoader(true)
    try{
        console.log("fetching post")
        const url = window.location.origin+'/api/posts'
        console.log(url)
        const res = await axios.get(window.location.origin +'/api/posts'+search)
     
        
        console.log(res.data)
        if(res.data.length == 0){
          setNoResult(true)
        }
        else{
          setNoResult(false)
        }
        setLoader(false)
        setPosts(res.data)

    }catch(err){
        console.log(err)
        setLoader(true)

    }
}
useEffect(()=>{
fetchPosts()
},[search])

  
  return (
    <>
      <Navbar/>
    <div className='px-8 md:px-[100px] min-h-[80vh]'>
      { loader?
      <div className='h-[40vh] flex items-center justify-center'>
         <Loader/>

      </div>:
      !noResult ? posts?.map((post)=>{
        return(
          <Link to={user?`/posts/post/${post._id}`:'/login'}>
          <HomePost key={post._id} post ={post}/>

          </Link>
        )
      }
      ):<h1 className='text-center font-bold mt-16'>No Post Available</h1>
    }
   
  
  
    
    </div>
    <Footer/>
    </>
  )
}

export default Home
