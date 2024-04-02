import React, { useContext } from 'react'
import { UserContext } from '../assets/context/UserContext'
import axios from 'axios'
import { URL } from '../url'
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {
const {user,setUser }= useContext(UserContext)
const navigate = useNavigate()

const handleLogout = async()=>{
  try{
    const res = await axios.get(window.location.origin+"/api/auth/logout",{withCredentials:true})
    console.log(res)
    setUser(null)
    navigate('/login')


  }catch(err){
    console.log(err,"log out error")
  }

}
  return (
    <div className='bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 rounded-md p-4 space-y-4 md:right-32' >
       {!user && <h3 className='text-sm text-white md:text-lg hover:text-gray-500'>
        <Link to='login'>
        Login
        </Link>
        </h3>}
         {!user && <h3 className='text-sm text-white md:text-lg hover:text-gray-500'>
          <Link to="/register">
          Register
          </Link>
          </h3>}
         {user && <h3 className='text-sm text-white md:text-lg hover:text-gray-500'>
          <Link to={"/profile/"+user._id}>
          Profile
          </Link>
          </h3>}
         {user && <h3 className='text-sm text-white md:text-lg hover:text-gray-500'>
          <Link to="/write">
          write
          </Link>
          </h3>}
         {user && <h3 className='text-sm text-white md:text-lg hover:text-gray-500'>
          <Link to={"/myblogs/"+user._id}>
          My Blogs
          </Link>
          </h3>}
         {user && <h3 className='text-sm text-white md:text-lg hover:text-gray-500' 
         onClick={handleLogout}
         >Logout</h3>}
      
    </div>
  )
}

export default Menu
