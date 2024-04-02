import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaBars } from 'react-icons/fa';
import Menu from './Menu';
import { UserContext } from '../assets/context/UserContext';
const Navbar = () => {
  const [prompt,setPrompt] = useState("")
  const [menu,setMenu] = useState(false)
  const path= useLocation().pathname
  const navigate = useNavigate()
  const showMenu = ()=>{
    setMenu(!menu)
 
    

  }
  console.log(prompt)
  const{user} = useContext(UserContext)
   console.log(user) 
  
  return (
    <div className='flex items-center justify-between px-6 lg:px-[200px] py-4'> <h1 className='text-lg md:text-xl font-extrabold'><Link to='/'>Blog Market</Link>
        </h1>

        {path==="/" && <div className='flex justify-center items-center space-x-0'>
            <p className='cursor-pointer'
            onClick={()=>{
              navigate(prompt?`?search=${prompt}`:navigate('/'))
              console.log(prompt?`?search=${prompt}`:navigate('/'))
            }
            }><FaSearch/></p>
            <input type="text"
            value={prompt}
            onChange={(e)=>{
              setPrompt(e.target.value)
            }}
            placeholder='search Post'
            className='outline-none px-3 '
            />

        </div>}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
         {user?<h3><Link to='/write'>Write</Link></h3> :<h3> <Link to='/login'>Login</Link></h3>}
         
         {user?
         <div onClick={showMenu}>
         <p   className='cursor-pointer'>  <FaBars/>
  {menu&&<Menu/>}</p>
         </div>
         : <h3> <Link to='/register'>Register</Link></h3>} </div>
        <div 
        onClick={showMenu}
        className="md:hidden text-lg cursor-pointer">
<p className='relative'> 
  
  <FaBars/>
  {menu&&<Menu/>}
</p>
       
       
        
        </div>

        
    </div>
  )
}

export default Navbar
