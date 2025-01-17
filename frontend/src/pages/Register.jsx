import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { URL } from '../url'

const Register = () => {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate(false)
  // console.log(username)
  // console.log(email)
  // console.log(password)
  const handleClick = async()=>{
    try{
     const res = await axios.post(window.location.origin+"/api/auth/register",{username,email,password})
     console.log(res.data)
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
     navigate('/login')

    }catch(err){
      setError(true)
      console.log(err,"register err")

    }

  }

  return (
    <>
     <div className='flex items-center justify-between px-6 md:px-[200px] py-4'> <h1 className='text-lg md:text-xl font-extrabold'><Link to='/'>BlogMarket</Link>
        </h1>
        <h3> <Link to='/login'>Login</Link></h3>
        </div>
    <div className='w-full flex justify-center items-center h-[80vh]'>
    <div className="flex flex-col justify-center item-center space-y-4 w-[80%] md:w-[25%]">
        <h1 className='text-xl font-bold text-left'>Create an account</h1>
      
      
        <input 
     onChange={(e)=>{setEmail(e.target.value)}}
        className='w-full px-4 py-2 border-2 border-black outline-0' type="email" placeholder='Enter the Email' />
        <input type="text" 
        onChange={(e)=>{setUsername(e.target.value)}}
        className='w-full px-4 py-2 border-2 border-black outline-0'
        placeholder='Enter your Username' />
         <input type="password" 
         onChange={(e)=>{setPassword(e.target.value)}}
        className='w-full px-4 py-2 border-2 border-black outline-0'
        placeholder='Enter your password' />
        <button
        onClick={handleClick}
        className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500'>Register</button>
{error &&  <h3 className='text-red-500 text-sm text-center'>Something went wrong</h3> }


      <div className="flex justify-center items-center space-x-3">
        <p>Already have an account?</p>
        <p className='text-gray-500 hover:text-black'><Link to='/login'>
            Login</Link></p>
      </div>
    </div>
  
</div>
<Footer/>
        </>
  )
}

export default Register
