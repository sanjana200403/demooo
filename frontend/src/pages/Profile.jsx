import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfilePost from '../components/ProfilePost'
import axios from 'axios'
import { URL } from '../url'
import { UserContext } from '../assets/context/UserContext'

import { useNavigate, useParams,Link } from 'react-router-dom'

const Profile = () => {
const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const {user,setUser} = useContext(UserContext)
const [updated,setUpdated] = useState(false)
const [posts,setPosts] = useState([])
const param = useParams().id
const navigate = useNavigate()


const handleUserUpdate = async()=>{
    setUpdated(false)
    try{
        const res = await axios.put(window.location.origin+"/api/users/"+param,{username,email,password },{withCredentials:true})
        console.log(res.data)
        setUpdated(true)


    }catch(err){
        console.log(err,"update profile err")
        setUpdated(false)
    }

}
const handleUserDelete = async()=>{

try{
    const res=await axios.delete(window.location.origin+"/api/users/"+user._id,{withCredentials:true})
    setUser(null)
    navigate("/")


}catch(err){
    console.log(err,"delete profile err")
}
}
const fetchProfile = async()=>{

    
    try{
        const res = await axios.get(window.location.origin+"/api/users/" + param)
        setUsername(res.data.username)
        console.log(res.data.username)
        setEmail(res.data.email)
        setPassword(res.data.password)

    }catch(err){
        console.log(err , "profile details err")

    }

}
const fetchUserPost =async()=>{
    try{
        const res = await axios.get(window.location.origin+'/api/posts/user/'+param)
        setPosts(res.data)
        console.log(res.data)

    }catch(err){
      console.log("mypost err",err)  
    }
    
}
useEffect(()=>{
 fetchProfile()
 fetchUserPost()
 },[param])

  return (

    <div>
        <Navbar/>
        <div className="min-h-[80vh] px-8 lg:px-[30px] mt-8 flex lg:flex-row flex-col-reverse lg:items-start items-start">
            {/* left div */}
            <div className='flex flex-col lg:w-[70%] w-full  mt-8 lg:mt-0'>
                <h1 className='text-xl font-bold mb-4'>YOUR POSTS:</h1>
                {posts?.map((p)=>(
                <Link to={`/posts/post/${p._id}`}>

                <ProfilePost key={p._id} p={p}/>
                </Link>
                ))}
               
{/*                
                <ProfilePost/>
                <ProfilePost/>
                <ProfilePost/> */}
            </div>
            {/* right div */}
            <div className='lg:sticky md:top-12 flex justify-start 
            lg:justify-end
            items-start lg:w-[30%] w-full md:items-end'>
                <div className='flex flex-col space-y-4 items-start'>
                <h1 className='text-xl font-bold mb-4'>Profile</h1>
                <input
               
               
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                type="text" placeholder='your username' className='outline-none px-4 py-2 text-gray-500'  />
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="text" placeholder='your email' className='outline-none px-4 py-2 text-gray-500' />
                {/* <input
                value={password}
                 onchange={(e)=>setPassword(e.target.value)}
                 type="text" placeholder='your password' className='outline-none px-4 py-2 text-gray-500' /> */}
                <div className="flex items-center space-x-4 mt-8">
                    <button 
                    onClick={handleUserUpdate}
                    className='text-white font-semibold bg-black px-4 py-2 hover:bg-gray-500 hover:text-black' >Update account</button>
                    <button
                    onClick={handleUserDelete}
                    className='text-white font-semibold bg-black px-4 py-2 hover:bg-gray-500 hover:text-black' >Delete Account</button>
                </div>
                {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
                </div>
                
                

            </div>
        </div>

        <Footer/>
      
    </div>
  )
}

export default Profile
